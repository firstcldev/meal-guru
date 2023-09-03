import axios from "axios";

const sampleObject = {
    "Storage Tips": {
        S: "Fennel is a sensitive plant",
    },
    "Shelf Life": {
        S: "9",
    },
    Category: {
        S: "Vegetables",
    },
    URL: {
        S: "",
    },
    Name: {
        S: "Fennel",
    },
};

export type GetAllPantryDetailsData = (typeof sampleObject)[];

export const getAllPantryDetails =
    async (): Promise<GetAllPantryDetailsData> => {
        const data: GetAllPantryDetailsData = (
            await axios.get(
                "https://e7smog9dt9.execute-api.us-east-1.amazonaws.com/default/getAllPantryDetails",
            )
        ).data;
        data.sort((a, b) => a.Category.S.localeCompare(b.Category.S));
        return data;
    };
