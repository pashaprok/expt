let exp: string | undefined = process.env.JWT_EXPIRES_IN;
let numExp: number = 60;
if(exp) {
    numExp = +exp;
}

export const authConfig = {
    jwt: {
        expire: numExp,
        secret: process.env.JWT_SECRET || 'secret',
    },
    bcrypt: {
        saltRounds: 12,
    },
}