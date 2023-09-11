import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_1c30A49qt",
    ClientId: "bfi4tbdei11plhminub583ng3",
};

export const userPool = new CognitoUserPool(poolData);
