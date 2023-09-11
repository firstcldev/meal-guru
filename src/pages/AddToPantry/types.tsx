import { GetAllPantryDetailsData } from "../../API";

export type Item = GetAllPantryDetailsData[0] | null;

export type AddToPantryFormData = {
    item: Item;
    quantity: number;
    unit: "weight" | "volume" | "quantity";
    purchaseDate: Date | null;
    expiryDate: Date | null;

    isValid: boolean;
};

export type AddToPantryFormUpdateAction = {
    type:
        | "UPDATE_ITEM"
        | "UPDATE_QUANTITY"
        | "UPDATE_UNIT"
        | "UPDATE_PURCHASEDATE"
        | "UPDATE_EXPIRYDATE";
    payload: AddToPantryFormData;
};

export type UpdateFormData = (arg: AddToPantryFormUpdateAction) => void;
