import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {grey, red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import {ISuperhero} from "../models/ISuperhero";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {IUser} from "../models/IUser";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Grid} from "@mui/material";
import {superheroSlice} from "../store/reducers/SuperheroSlice";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";

interface HeroItemProps {
    hero: ISuperhero;
    addFavorite: ({}) => void;
    removeFavorite: ({}) => void;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    })
}));

const HeroCard: FC<HeroItemProps> = ({hero,
                                         addFavorite, removeFavorite}) => {
    const {user, favorite_superheros_ids} = useAppSelector(state => state.userReducer);
    const {setOnlyRead, setId} = superheroSlice.actions;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleExpandClick = (id: number) => {
        dispatch(setOnlyRead(true));
        dispatch(setId(id));
        navigate(RouteNames.EDIT);
    };

    const handleEditClick = (id: number) => {
        dispatch(setOnlyRead(false));
        dispatch(setId(id));
        navigate(RouteNames.EDIT);
    };
    
    const favorite = (hero: ISuperhero, user: IUser) => {
        if(!user){
            return;
        }
        if(user.favorite_superheros && favorite_superheros_ids.includes(hero.id)) {
            removeFavorite({hero, user});
        } else {
            addFavorite({hero, user});
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
    <Card elevation={5} sx={{ maxWidth: 360, marginLeft: '15px', marginTop: '15px' }}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
                    {hero.nickname.toUpperCase().charAt(0)}
                </Avatar>
            }
            action={
                <IconButton  onClick={() => handleEditClick(hero.id)} aria-label="settings">
                    <EditIcon  />
                </IconButton>
            }
            title={hero.nickname}
            subheader={hero.real_name}
        />
        <CardMedia
            component="img"
            height="194"
            alt="hero_avatar" src={process.env.REACT_APP_SERVER_URL + hero.main_image}
        />
        <CardContent>
            <Typography paragraph>Bio:</Typography>
            <Typography variant="body2" color="text.secondary">
                {hero.origin_description}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            { user.id && <IconButton aria-label="add to favorites" onClick={() => favorite(hero, user)}>
                { user.favorite_superheros && favorite_superheros_ids.includes(hero.id)
                    ?
                    <FavoriteIcon  />
                    :
                    <FavoriteBorderIcon  /> }
            </IconButton> }
            <ExpandMore
                expand={true}
                onClick={() => handleExpandClick(hero.id)}
                aria-expanded={true}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
    </Card>
        </Grid>
    );
};

export default HeroCard;
