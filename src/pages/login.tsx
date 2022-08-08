import React, {FC, useEffect} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link, TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {RouteNames} from "../router";
import {userAPI} from "../services/user.service";
import {IUser} from "../models/IUser";
import {useNavigate} from "react-router-dom";
import {userSlice} from "../store/reducers/UserSlice";
import {useAppDispatch} from "../hooks/redux";
import MainAppBar from "../components/navbar/MainAppBar";





const Login: FC = () => {

    const navigate = useNavigate();

    const [enterLogin, {data: token, error: loginError}] = userAPI.useLoginMutation();
    const {setToken} = userSlice.actions;
    const dispatch = useAppDispatch();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        enterLogin({
            email: data.get('email'),
            password: data.get('password'),
        } as IUser);
    };

    useEffect(()=> {
        if(token){
            localStorage.setItem('TOKEN', token.token);
            dispatch(setToken(token.token));
            navigate('/');
        }
    },[token]);

    // @ts-ignore
    return (

            <Container component="main" maxWidth="xs">
                <MainAppBar></MainAppBar>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"

                        />
                        {loginError && <Typography component="h1" variant="h6" color={"red"}>  {JSON.stringify(loginError)} </Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={RouteNames.REGISTRATION} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
};

export default Login;
