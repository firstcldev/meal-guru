import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { userPool } from "./config";

type GetCurrentCognitoUserDataResult = {
    sub: string;
    name?: string;
    email?: string;
    emailVerified?: boolean;
};

export function getCurrentCognitoUser(): CognitoUser | null {
    return userPool.getCurrentUser();
}

export async function getCurrentCognitoUserData(): Promise<GetCurrentCognitoUserDataResult> {
    return new Promise<GetCurrentCognitoUserDataResult>((resolve, reject) => {
        const user = userPool.getCurrentUser();
        if (!user) {
            return reject(null);
        }
        user.getSession(function (err: any, session: CognitoUserSession) {
            if (err) {
                console.log(err);
                return reject(null);
            } else {
                resolve({
                    sub: session.getIdToken().payload.sub,
                    name: session.getIdToken().payload.name,
                    email: session.getIdToken().payload.email,
                    emailVerified: session.getIdToken().payload.email_verified,
                });
            }
        });
    });
}
