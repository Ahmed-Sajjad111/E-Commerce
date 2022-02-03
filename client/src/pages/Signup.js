import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADDSHOPPER } from "../utils/mutations";
import { Box, TextField, Button, FormControl, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function Signup(props) {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [addShopper] = useMutation(ADDSHOPPER);

    // collects form data and creates a new user authentication token
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addShopper({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addShopper.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{
                mt: 20,
                bgcolor: "secondary.light",
                width: "50%",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                px: 4,
                mb: 10,
                height: "100%"
            }}
        >
            <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="info" sx={{ my: 2, mx: "auto" }}>
                    <ArrowCircleLeftIcon /> Go to Login
                </Button>
            </Link>
            <Typography align="center" variant="h3" component="div" sx={{ my: 2 }}>
                Sign Up
            </Typography>
            <FormControl sx={{ my: 2 }} variant="outlined">
                <TextField
                    label="First Name"
                    InputLabelProps={{ shrink: true }}
                    placeholder="First Name"
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    onChange={handleChange}
                    sx={{ width: "90%", mx: "auto" }}
                />
            </FormControl>
            <FormControl sx={{ my: 2 }}>
                <TextField
                    label="Last Name"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Last Name"
                    name="lastName"
                    type="lastName"
                    id="lastName"
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ width: "90%", mx: "auto" }}
                />
            </FormControl>
            <FormControl sx={{ my: 2 }}>
                <TextField
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    placeholder="youremail@text.com"
                    name="email"
                    type="email"
                    id="email"
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ width: "90%", mx: "auto" }}
                />
            </FormControl>
            <FormControl sx={{ my: 2 }}>
                <TextField
                    label="Password"
                    InputLabelProps={{ shrink: true }}
                    placeholder="********"
                    name="password"
                    type="password"
                    id="pw"
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ width: "90%", mx: "auto" }}
                />
            </FormControl>
            <Button
                variant="contained"
                onClick={handleFormSubmit}
                sx={{ my: 2, width: "30%", mx: "auto" }}
                color="info"
            >
                Submit
            </Button>
        </Box>
    );
}

export default Signup;
