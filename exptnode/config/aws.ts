import { config } from 'dotenv';
config({ path: '../.env' });

export const awsConfig = {
    cognitoUserPoolID: process.env.AWS_COGNITO_USER_POOL_ID || '',
    cognitoClientID: process.env.AWS_COGNITO_CLIENT_ID || '',
    cognitoRegion: process.env.AWS_COGNITO_REGION || '',
    cognitoIdentityPoolID: process.env.AWS_COGNITO_IDENTITY_POOL_ID || '',
    cognitoAPIVersion: process.env.AWS_COGNITO_APIVERSION || '',
    cognitoClientSecret: process.env.AWS_COGNITO_CLIENT_SECRET || '',
};