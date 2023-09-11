import axios from "axios";

const sampleObject = {
    "Freshness Tips": {
        S: "Papayas change color on ripening",
    },
    "Storage Tips": {
        S: "Store the ripe papayas (yellow-ish in colour) in your fridge.",
    },
    ID: {
        N: "7",
    },
    "Shelf Life": {
        S: "5",
    },
    Category: {
        S: "Fruits",
    },
    URL: {
        S: "https://s3.amazonaws.com/grocery-project/default_product_images/Papaya.jpg",
    },
    Name: {
        S: "Papaya",
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
