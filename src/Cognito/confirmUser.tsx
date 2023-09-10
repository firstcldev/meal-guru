// confirm registered cognito user with code sent to their email

import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "./config";

type ConfirmationResult = {
    data?: any;
    error?: string;
};

export async function confirmUserWithCode(
    email: string,
    code: string,
): Promise<ConfirmationResult> {
    return new Promise((resolve, reject) => {
        const userData = {
            Username: email, // email is username
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                reject({ error: err.message || JSON.stringify(err) });
                return;
            }
            console.log(result);
            resolve({ data: result });
        });
    });
}

type ResendConfirmationCodeResult = {
    data?: any;
    error?: string;
};

export function resendConfirmationCode(
    email: string,
): Promise<ResendConfirmationCodeResult> {
    return new Promise((resolve, reject) => {
        const userData = {
            Username: email, // email is username
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                reject({ error: err.message || JSON.stringify(err) });
                return;
            }
            resolve({ data: result });
        });
    });
}
