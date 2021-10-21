import {NextFunction, Request, Response} from "express";
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import {awsConfig} from "../config/aws";
import {
    ConfirmSignUpRequest,
    InitiateAuthRequest,
    SignUpRequest,
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import axios, {AxiosResponse} from "axios";
import jwkToPem from "jwk-to-pem";
import jwt from 'jsonwebtoken';
import crypto from "crypto";

const cognitoServiceOptions = {
    apiVersion: awsConfig.cognitoAPIVersion,
    region: awsConfig.cognitoRegion,
}

function hashSecret(email: string): string {
    return crypto.createHmac('SHA256', awsConfig.cognitoClientSecret)
        .update(email + awsConfig.cognitoClientID)
        .digest('base64')
}

let pems: { [key: string]: any }  = {}

const MyCognitoServiceProvider: CognitoIdentityServiceProvider = new CognitoIdentityServiceProvider(cognitoServiceOptions);

export async function registerCognito(req: Request, res: Response) {
    const params: SignUpRequest = {
        ClientId: awsConfig.cognitoClientID,
        Password: req.body.password,
        SecretHash: hashSecret(req.body.email),
        Username: req.body.email,
    }
    console.log(params);

    const data = await MyCognitoServiceProvider.signUp(params).promise();
    return res.status(200).json({ data })
}

export async function confirmRegisterCognito(req: Request, res: Response) {
    let params: ConfirmSignUpRequest = {
        ClientId: awsConfig.cognitoClientID,
        ConfirmationCode: req.body.code,
        Username: req.body.email,
        SecretHash: hashSecret(req.body.email),
    };

    const data = await MyCognitoServiceProvider.confirmSignUp(params).promise();
    return res.status(200).json({ data })
}

export async function signInCognito(req: Request, res: Response) {
    let params: InitiateAuthRequest = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: awsConfig.cognitoClientID,
        AuthParameters: {
            'USERNAME': req.body.email,
            'PASSWORD': req.body.password,
            'SECRET_HASH': hashSecret(req.body.email)
        },
    }

    const data = await MyCognitoServiceProvider.initiateAuth(params).promise();
    return res.status(200).json({ data })
}

export async function verifyCognitoToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.body.token;
    if (!token) return res.status(401).end();

    let decodedJwt: any = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
        return res.status(401).end()
    }

    const URL = `https://cognito-idp.${awsConfig.cognitoRegion}.amazonaws.com/${awsConfig.cognitoUserPoolID}/.well-known/jwks.json`;
    const response: AxiosResponse = await axios.get(URL);
    const { keys } = response.data;
    for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        pems[key_id] = jwkToPem(jwk);
    }

    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    if (!pem) {
        return res.status(401).end()
    }

    jwt.verify(token, pem, function (err: any, payload: any) {
        if (err) {
            return res.status(401).end()
        } else {
            next()
        }
    })
}