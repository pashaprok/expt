import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt'
import {User} from '../entities/User'
import {createUser, getUser, getUserByEmail} from '../repositories/user'
import {Request, Response} from "express";
import bcrypt from 'bcrypt'
import {BadRequest, Unauthorized} from "http-errors";
import {authConfig} from "../config/auth";
import {getCity} from "../repositories/city";

const createToken = (user: User) => {
    const sub = user.id
    return jwt.sign({sub}, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expire * 60,
    });
}

export async function registerUser(req: Request, res: Response) {
    const newUser: User = req.body;
    newUser.password = await bcrypt.hash(newUser.password, authConfig.bcrypt.saltRounds)

    const check: User = await getUserByEmail(newUser.email)

    if (check) {
        throw new Unauthorized('Email is already taken')
    }

    try {
        await getCity(+newUser.cityID)
    } catch (e) {
        throw new BadRequest('City is unknown')
    }

    // validate

    const response: User = await createUser(newUser);

    const token = createToken(response)
    return res.status(200).json({
        status: 'success',
        data: response,
        token
    })

}

export async function loginUser(req: Request, res: Response) {
    const {email, password} = req.body
    const userFound: User = await getUserByEmail(email)

    if (!userFound || !await bcrypt.compare(password, userFound.password)) {
        throw new Unauthorized('Incorrect password or email')
    } else {
        const token = createToken(userFound)
        return res.status(200).json({
            status: 'success',
            data: userFound,
            token
        })
    }
}

passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    async function (jwt_payload, done: VerifiedCallback) {
        const user: User = await getUser(jwt_payload.sub)

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
));

passport.serializeUser(function (user: User, done) {
    delete user.password;
    done(null, user.id);
});

passport.deserializeUser(async function (id: number, done) {
    const user: User = await getUser(id);
    done(null, user);
});

export default passport;