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

type GetAllPantryDetailsData = (typeof sampleObject)[];

export const getAllPantryDetails = async (): Promise<GetAllPantryDetailsData> =>
    (
        await axios.get(
            "https://cm2gfsqs5m.execute-api.us-east-1.amazonaws.com/default/getAllPantryDetails",
        )
    ).data;
