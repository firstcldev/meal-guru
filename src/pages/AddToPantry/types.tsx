// TODO: define item
export type Item = any;

export type AddToPantryFormData = {
    item: Item;
    quantity: number;
    unit: "Weight" | "Volume" | "Pieces";
    purchaseDate: Date | null;
    expiryDate: Date | null;
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
