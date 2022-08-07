import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
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
import {useAppSelector} from "../hooks/redux";
import {Grid} from "@mui/material";

interface HeroItemProps {
    hero: ISuperhero;
    remove: (hero: ISuperhero) => void;
    update: (hero: ISuperhero) => void;
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
                                         addFavorite, removeFavorite, remove, update}) => {
    const {user, favorite_superheros_ids} = useAppSelector(state => state.userReducer);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
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
                <IconButton aria-label="settings">
                    <EditIcon />
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
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>Superpowers:</Typography>
                <Typography paragraph>
                    {hero.superpowers}
                </Typography>
                <Typography paragraph>Catch phrase:</Typography>
                <Typography>
                    {hero.catch_phrase}
                </Typography>
            </CardContent>
        </Collapse>
    </Card>
        </Grid>
    );
};

export default HeroCard;
