import { userPool } from "./config";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

type AuthenticateUserResult = {
    data?: any;
    error?: string;
};

export function authenticateUser(
    email: string,
    password: string,
): Promise<AuthenticateUserResult> {
    return new Promise((resolve, reject) => {
        const authenticationData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData,
        );

        const userData = {
            Username: email,
            Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve({ data: result });
            },

            onFailure: (err) => {
                reject({ error: err.message || JSON.stringify(err) });
            },
        });
    });
}
