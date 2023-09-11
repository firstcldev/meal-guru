import axios from "axios";
import { AddToPantryFormData } from "../pages/AddToPantry/types";

type RequestObject = {
    pantryItems: [
        {
            username: string;
            status: "Create" | "Update" | "Delete";
            item?: string;
            quantity?: number;
            unit?: AddToPantryFormData["unit"];
            purchaseDate?: string;
            expiryDate?: string;
            pantryItemId?: string;
        },
    ];
};

export const modifyPantryByOps = async (
    requestObject: RequestObject,
): Promise<string> => {
    const data: string = (
        await axios.get(
            "https://n5oy9h6i86.execute-api.us-east-1.amazonaws.com/default/getUserPantryByEmail",
            {
                data: requestObject as RequestObject,
            },
        )
    ).data;
    return data;
};
