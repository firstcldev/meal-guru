export interface Item {
    // TODO: define item
}

export type AddToPantryFormData = {
    item: Item;
    quantity?: number;
    unit?: "pcs" | "gm" | "kg" | "ltr" | "ml";
    purchaseDate?: Date;
    expiryDate?: Date;
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
