import React from 'react';
import {Button, CardActionArea, Container, Grid, Typography} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";
import {superheroAPI} from "../../services/superhero.service";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

const HeroPage = () => {
    const navigate = useNavigate();
    const {id} = useAppSelector(state => state.superheroReducer);
    const {data: hero, error, isLoading} = superheroAPI.useFetchOneQuery(id);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    return (
        <Container sx={{py: 8}} component="main" maxWidth="xs">
            {isLoading &&  <Typography variant='h5' align='center' mt={3} color='textSecondary'>Loading....</Typography>}
            <Grid container spacing={2} justifyContent='center' mt={3}>
               <Grid item xs={11} sm={11} md={11}>
                <Card>
                        <CardMedia
                            component="img"
                            height="240"
                            image={hero && hero.main_image !== '' ? process.env.REACT_APP_SERVER_URL + hero.main_image :
                                process.env.PUBLIC_URL + 'no-image-icon.png'  }
                            alt="superhero avatar"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {hero?.nickname}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {hero?.real_name}
                            </Typography>
                            <Typography paragraph>Bio:</Typography>
                            <Typography paragraph variant="body2" color="text.secondary">
                                {hero?.origin_description}
                            </Typography>
                            <Typography paragraph>Superpowers:</Typography>
                            <Typography paragraph variant="body2" color="text.secondary">
                                {hero?.superpowers}
                            </Typography>
                            <Typography paragraph>Catch phrase:</Typography>
                            <Typography paragraph variant="body2" color="text.secondary">
                                {hero?.catch_phrase}
                            </Typography>
                        </CardContent>
                    <CardActionArea>
                        <Button fullWidth variant="contained" onClick={() => navigate(RouteNames.MAIN)}>Close</Button>
                    </CardActionArea>
                </Card>
               </Grid>
            </Grid>
        </Container>
    );
};

export default HeroPage;
