import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { userPool } from "./config";

type RegisterResult = {
    data?: CognitoUser;
    error?: string;
};

export async function registerNewUser(
    name: string,
    email: string,
    password: string,
): Promise<RegisterResult> {
    return new Promise<RegisterResult>((resolve, reject) => {
        const attributeList = [];
        attributeList.push(
            new CognitoUserAttribute({ Name: "name", Value: name }),
        );
        attributeList.push(
            new CognitoUserAttribute({ Name: "email", Value: email }),
        );

        userPool.signUp(
            email, // email is used as username
            password,
            attributeList,
            null as any,
            (err, result) => {
                if (!result) {
                    if (err)
                        reject({ error: err.message || JSON.stringify(err) });
                    return;
                }
                const cognitoUser = result.user;
                resolve({ data: cognitoUser });
                return;
            },
        );
    });
}
