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

        let output;
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                output = result;
            },

            onFailure: (err) => {
                reject({ error: err.message || JSON.stringify(err) });
            },
        });
        cognitoUser.setDeviceStatusRemembered({
            onSuccess: function (result) {
                console.log("Device status remembered");
            },
            onFailure: function (err) {
                console.log("Device status not remembered", err);
            },
        });

        resolve({ data: output });
    });
}
