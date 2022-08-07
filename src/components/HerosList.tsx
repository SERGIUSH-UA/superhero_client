import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {superheroAPI} from "../services/superhero.service";
import HeroCard from "./HeroCard";
import {ISuperhero} from "../models/ISuperhero";
import {Container, Grid, Pagination, Stack} from "@mui/material";
import {IUser} from "../models/IUser";
import {useAppDispatch} from "../hooks/redux";
import {userSlice} from "../store/reducers/UserSlice";

interface HeroesInterface {

}

const HeroesList: FC<HeroesInterface> = () => {

    const [page, setPage] = useState(0);
    const {data: heroes, error, isLoading} = superheroAPI.useFetchAllQuery({limit: 5, page});
    const {setUser} = userSlice.actions;
    const dispatch = useAppDispatch();
    const [createHero, {}] = superheroAPI.useCreateMutation();
    const [deleteHero, {}] = superheroAPI.useDeleteMutation();
    const [updateHero, {}] = superheroAPI.useUpdateMutation();
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

    function createHandle() {
        createHero({nickname: 'da', real_name: "test"} as ISuperhero);
    }

    function handleUpdate(hero: ISuperhero) {
        deleteHero(hero);
    }

    function handleRemove(hero: ISuperhero) {
        updateHero(hero);
    }

    function handleAddFavorite(hero: ISuperhero, user: IUser) {
        addFavorite({hero, user});
    }

    function handleRemoveFavorite(hero: ISuperhero, user: IUser) {
        removeFavorite({hero, user});
    }

    return (
        <Container sx={{py: 8}} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4} marginBottom={5}>
                {isLoading && <h2>Loading.....</h2>}
                {error && <h2 style={{color: 'red'}}>Error</h2>}

                {heroes && heroes.rows && heroes.rows.map(hero =>
                    <HeroCard remove={handleRemove} update={handleUpdate}
                              addFavorite={addFavorite} removeFavorite={removeFavorite}
                              key={hero.id} hero={hero} />
                )}
            </Grid>
            <Stack spacing={2}>
                <Pagination  onChange={handlePageChange} count={heroes ? Math.round(heroes.count/5)     : 0} variant="outlined" color="primary"/>
            </Stack>
        </Container>
    );
};

export default HeroesList;
