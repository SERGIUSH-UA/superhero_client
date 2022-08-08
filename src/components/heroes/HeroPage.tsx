import React, {useEffect} from 'react';
import {Button, CardActionArea, Collapse, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {superheroAPI} from "../../services/superhero.service";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ExpandMore from "../elements/ExpandMore";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeroPhotoGallery from "../images/HeroPhotoGallery";
import {superheroSlice} from "../../store/reducers/SuperheroSlice";

const HeroPage = () => {

    const navigate = useNavigate();
    const {id, images_array} = useAppSelector(state => state.superheroReducer);
    const {data: hero, error, isLoading} = superheroAPI.useFetchOneQuery(id);

    const {setHero} = superheroSlice.actions;
    const dispatch = useAppDispatch();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (hero) {
            dispatch(setHero(hero))
        }
    }, [hero]);


    return (
        <Container sx={{py: 8}} component="main" maxWidth="md">
            {isLoading && <Typography variant='h5' align='center' mt={3} color='textSecondary'>Loading....</Typography>}
            <Grid container spacing={2} justifyContent='center' mt={3}>
                <Grid item xs={11} sm={11} md={11}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="350"
                            image={hero && hero.main_image !== '' ? process.env.REACT_APP_SERVER_URL + hero.main_image :
                                process.env.PUBLIC_URL + 'no-image-icon.png'}
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
                            <Button sx={{mb: 2}} fullWidth variant="contained"
                                    onClick={() => navigate(RouteNames.MAIN)}>Close</Button>
                            <Grid container>
                                <ExpandMore
                                    onClick={handleExpandClick}
                                    expand={expanded}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon/>
                                </ExpandMore> <Typography
                                sx={{flexGrow: 1}} variant='button'
                                onClick={handleExpandClick}>Photo gallery</Typography></Grid>

                        </CardActionArea>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <HeroPhotoGallery itemData={images_array}/>
                    </Collapse>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeroPage;
