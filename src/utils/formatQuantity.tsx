export function formatQuantity(
    quantityStr: string,
    unit: "weight" | "volume" | "quantity",
) {
    const parts = quantityStr.split(".");
    let bigUnit = unit == "weight" ? "Kg" : unit == "volume" ? "Ltr" : "Pcs";
    let smallUnit = unit == "weight" ? "gm" : unit == "volume" ? "ml" : "";

    if (parts.length > 1) {
        const grams = parseFloat(`0.${parts[1]}`) * 1000;
        return (
            (parts[0] != "0" ? `${parts[0]}${bigUnit} ` : ``) +
            `${grams.toFixed(0)}${smallUnit}`
        );
    }

    return `${quantityStr}${bigUnit}`;
}
