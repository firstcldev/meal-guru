import { useQuery } from "@tanstack/react-query";
import { getCurrentCognitoUserData } from "../../Cognito";

export const useCurrentUser = () => {
    const { data: userData, isLoading } = useQuery(
        ["profile"],
        getCurrentCognitoUserData,
        { refetchOnMount: false, refetchOnWindowFocus: false },
    );
    return { userData, isLoading };
};
