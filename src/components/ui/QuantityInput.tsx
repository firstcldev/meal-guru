import { Box, InputAdornment, TextField } from "@mui/material";
import { AddToPantryFormData } from "../../pages/AddToPantry/types";

type InputFieldsProps = {
    value: number;
    unit: AddToPantryFormData["unit"];
    onChange: (value: number) => void;
};

export const QuantityInput: React.FC<InputFieldsProps> = ({ ...props }) => {
    const bigUnitLabel =
        props?.unit == "weight" ? "Kg" : props.unit == "volume" ? "Ltr" : "Pcs";
    const smallUnitLabel =
        props?.unit == "weight" ? "gm" : props.unit == "volume" ? "ml" : "";

    const bigValue = Math.floor(props.value);
    const smallValue = Math.floor(
        parseFloat((props.value - bigValue).toFixed(3)) * 10 ** 3,
    );

    const handleValueChange = (valueType: "big" | "small", value: number) => {
        let newValue: number;
        if (valueType == "big") {
            newValue = value + smallValue / 10 ** 3;
        } else {
            newValue = bigValue + value / 10 ** 3;
        }
        newValue = parseFloat(newValue.toFixed(3));
        props.onChange(newValue);
    };

    return (
        <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
        >
            <TextField
                id={"big"}
                size="small"
                label={"Enter " + bigUnitLabel}
                type="number"
                inputProps={{ min: "0", max: "1000" }}
                sx={{ flex: 1 }}
                value={bigValue}
                onChange={(e) =>
                    handleValueChange("big", Number(e.target.value))
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {bigUnitLabel}
                        </InputAdornment>
                    ),
                }}
            />
            {(["weight", "volume"] as (typeof props.unit)[]).includes(
                props.unit,
            ) && (
                <>
                    <TextField
                        id={"small"}
                        size="small"
                        label={"Enter " + smallUnitLabel}
                        type="number"
                        sx={{ flex: 1 }}
                        inputProps={{ min: "0", max: "1000" }}
                        value={smallValue}
                        onChange={(e) =>
                            handleValueChange("small", Number(e.target.value))
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {smallUnitLabel}
                                </InputAdornment>
                            ),
                        }}
                    />
                </>
            )}
        </Box>
    );
};
