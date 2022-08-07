import React from 'react';
import {Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import {RouteNames} from "../router";

const HeroPage = () => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography variant='h4' align='center' mt={3} color='textPrimary'>Create superhero</Typography>
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant='h5' align='center' mt={3} color='textPrimary'>Create superhero</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant='h5' align='center' mt={3} color='textPrimary'>Create superhero</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 4, mb: 4, mr:20}}
                >
                    Add new
                </Button>
            </Grid>
        </Container>
    );
};

export default HeroPage;
