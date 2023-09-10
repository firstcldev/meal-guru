import { TextField } from "@mui/material";
import { isEmailValid, isPasswordValid } from "./validators";

export function Namefield({
    value,
    onChange,
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <TextField
            sx={{ marginTop: "60px" }}
            fullWidth
            label="Name"
            type="text"
            required
            placeholder="ex: Pratik Shanbhag"
            variant="standard"
            value={value}
            onChange={onChange}
        />
    );
}

export function Emailfield({
    value,
    onChange,
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <TextField
            sx={{ marginTop: "25px" }}
            fullWidth
            label="Email"
            type="email"
            required
            placeholder="ex: name@email.com"
            variant="standard"
            value={value}
            error={isEmailValid(value) ? false : true}
            InputProps={{ type: "email" }}
            onChange={onChange}
        />
    );
}

export function Passwordfield({
    value,
    onChange,
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <TextField
            sx={{ marginTop: "25px" }}
            fullWidth
            label="Password"
            type="password"
            required
            placeholder="Password"
            variant="standard"
            value={value}
            InputProps={{ type: "password" }}
            error={isPasswordValid(value) ? false : true}
            onChange={onChange}
        />
    );
}
