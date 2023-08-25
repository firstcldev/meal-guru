import {
    Box,
    Paper,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { AddToPantryFormData, UpdateFormData } from "./types";

type QuantityProps = {
    formData: AddToPantryFormData;
    updateFormData: UpdateFormData;
};

type InputFieldsProps = {
    value: number;
    unit: AddToPantryFormData["unit"];
    onChange: (value: number) => void;
};

const InputFields: React.FC<InputFieldsProps> = ({ ...props }) => {
    const bigUnitLabel =
        props?.unit == "Weight" ? "KG" : props.unit == "Volume" ? "LTR" : "Pcs";
    const smallUnitLabel =
        props?.unit == "Weight" ? "MG" : props.unit == "Volume" ? "ML" : "";

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
            />
            <Typography>{bigUnitLabel}</Typography>
            {(["Weight", "Volume"] as (typeof props.unit)[]).includes(
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
                    />
                    <Typography>{smallUnitLabel}</Typography>
                </>
            )}
        </Box>
    );
};

const Quantity: React.FC<QuantityProps> = ({ ...props }) => {
    return (
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 2,
            }}
        >
            <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Typography variant="h6">How much did you buy?</Typography>
                {/* mock */}
                {/* <Typography variant="subtitle1">0</Typography> */}
            </Box>
            <ToggleButtonGroup
                fullWidth
                value={props.formData.unit}
                exclusive
                onChange={(_, newUnit) =>
                    props.updateFormData({
                        type: "UPDATE_UNIT",
                        payload: { ...props.formData, unit: newUnit },
                    })
                }
            >
                {(
                    [
                        "Weight",
                        "Volume",
                        "Pieces",
                    ] as (typeof props.formData.unit)[]
                ).map((unit) => (
                    <ToggleButton value={unit} key={unit}>
                        {unit}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <InputFields
                value={props.formData.quantity}
                onChange={(v) =>
                    props.updateFormData({
                        type: "UPDATE_QUANTITY",
                        payload: { ...props.formData, quantity: v },
                    })
                }
                unit={props.formData.unit}
            />
        </Paper>
    );
};

export default Quantity;
