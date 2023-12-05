import {
    Box,
    InputAdornment,
    Paper,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { AddToPantryFormData, UpdateFormData } from "./types";
import { QuantityInput } from "../../components/ui/QuantityInput";

type QuantityProps = {
    formData: AddToPantryFormData;
    updateFormData: UpdateFormData;
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
                        payload: {
                            ...props.formData,
                            unit: newUnit,
                            quantity: 0,
                        },
                    })
                }
            >
                {(
                    [
                        "weight",
                        "volume",
                        "quantity",
                    ] as (typeof props.formData.unit)[]
                ).map((unit) => (
                    <ToggleButton value={unit} key={unit}>
                        {unit}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <QuantityInput
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
