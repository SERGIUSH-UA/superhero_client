import React, {FC, useEffect, useState} from 'react';
import {superheroAPI} from "../../services/superhero.service";
import HeroCard from "./HeroCard";
import {Container, Grid, Pagination, Stack, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";

interface HeroesInterface {

}

const HeroesList: FC<HeroesInterface> = () => {

    const [page, setPage] = useState(0);
    const {data: heroes, error, isLoading} = superheroAPI.useFetchAllQuery({limit: 6, page});

    const {user} = useAppSelector(state => state.userReducer);
    const {setUser} = userSlice.actions;
    const dispatch = useAppDispatch();

    const [addFavorite, {data: userAddFav}] = superheroAPI.useAddFavoriteMutation();
    const [removeFavorite, {data: userRemFav}] = superheroAPI.useRemoveFavoriteMutation();

    useEffect(() => {
        if(userAddFav){
            dispatch(setUser(userAddFav));
        }
    },[userAddFav]);

    useEffect(() => {
        if(userRemFav){
            dispatch(setUser(userRemFav));
        }
    },[userRemFav]);

    const handlePageChange = (event: any, value: number) => {
        setPage(value - 1);
    };

    return (
        <Container sx={{py: 8}} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4} marginBottom={5}>
                {isLoading && <Typography mt={8} variant='h6' >Loading.....</Typography>}
                {error && <h2 style={{color: 'red'}}>Error</h2>}
                {heroes && heroes.rows && heroes.rows.map(hero =>
                    <HeroCard addFavorite={addFavorite} removeFavorite={removeFavorite}
                              key={hero.id} hero={hero} />
                )}
                {heroes && heroes.count === 0 && <Typography mt={8} mr={3} ml={3} variant='h3'>The catalog is empty.
                    {user.id !== 0 ?
                    ' If you want you can add new hero. Click on the left top corner icon' :
                    ' Login please if you want add new hero' } </Typography>}
            </Grid>
            {heroes && heroes.count !== 0 &&  <Stack spacing={2}>
                <Pagination  onChange={handlePageChange} count={heroes ? Math.ceil(heroes.count/6)     : 0} variant="outlined" color="primary"/>
            </Stack> }
        </Container>
    );
};

export default HeroesList;
