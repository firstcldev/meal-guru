import axios from "axios";

type SampleObject = {
    purchaseDate: {
        S: string;
    };
    quantity: {
        S: string;
    };
    unit: {
        S: "weight" | "volume" | "quantity";
    };
    pantryItemId: {
        S: string;
    };
    expiryDate: {
        S: string;
    };
    username: {
        S: string;
    };
    item: {
        S: string;
    };
};

export type GetPantryByEmailData = SampleObject[];

export const getPantryByEmail = async (
    email: string,
): Promise<GetPantryByEmailData> => {
    if (!email) {
        throw Error("Email is required");
    }
    const data: GetPantryByEmailData = (
        await axios.post(
            "https://b1c8ppeyub.execute-api.us-east-1.amazonaws.com/default/getUserPantryByEmail",
            {
                username: email,
            },
        )
    ).data;
    return data;
};
