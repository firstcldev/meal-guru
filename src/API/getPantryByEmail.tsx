import axios from "axios";

const sampleObject = {
    purchaseDate: {
        S: "2023-08-01",
    },
    quantity: {
        N: "10",
    },
    unit: {
        S: "kilos",
    },
    pantryItemId: {
        S: "4a8ed5e6-5ccc-4847-b84d-93ddcbf3848b",
    },
    expiryDate: {
        S: "2023-08-31",
    },
    username: {
        S: "vishalviswanathan9@gmail.com",
    },
    item: {
        S: "Chicken",
    },
};

export type GetPantryByEmailData = (typeof sampleObject)[];

export const getPantryByEmail = async (
    email: string,
): Promise<GetPantryByEmailData> => {
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