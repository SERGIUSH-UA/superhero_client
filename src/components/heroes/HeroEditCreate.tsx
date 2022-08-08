import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid, Modal, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {superheroAPI} from "../../services/superhero.service";
import {RouteNames} from "../../router";
import {useNavigate} from "react-router-dom";
import {superheroSlice} from "../../store/reducers/SuperheroSlice";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const HeroEditCreate = () => {

    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.userReducer);
    const {id, superhero: hero} = useAppSelector(state => state.superheroReducer);
    const {data: heroServer, error, isLoading} = superheroAPI.useFetchOneQuery(id);
    const {setHero, setSupNickname, setSupSuperpowers, setSupOriginDescription,
        setSupRealName, setSupCatchPhrase} = superheroSlice.actions;
    const dispatch = useAppDispatch();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [createHero, {data: newHero, error: newHeroError}] = superheroAPI.useCreateMutation();
    const [updateHero, {data: updatedHero, error: updatedHeroError}] = superheroAPI.useUpdateMutation();
    const [deleteHero, {data: delHero, error: delHeroError}] = superheroAPI.useDeleteMutation();

    const changeFileHandler = (event: any) => {
        if (event.target && event.target.files){
            setSelectedFiles(event.target.files);
            setIsFilePicked(true);
        }
    };

    const handleSubmit = async () => {
        let data = new FormData();
        if (selectedFiles.length) {
            for(const indexFile in selectedFiles) {
                data.append('images',selectedFiles[indexFile]);
            }
        }
        // for(let key in hero){
        //     if(key.includes('images') || key.includes('author_id')){
        //         data.append(key, hero[key]);
        //     }
        // }
        data.append("author_id", user.id.toString());
        data.append("nickname", hero.nickname);
        data.append("real_name", hero.real_name);
        data.append("origin_description", hero.origin_description);
        data.append("superpowers", hero.superpowers);
        data.append("catch_phrase", hero.catch_phrase);
        data.append("main_image", hero.main_image);
        if(id === -1){
            createHero(data);
        }
        else {
            updateHero({hero: data, id:hero.id});
        }
    };

    const handleDelete = async () => {
        if(id !== -1){
            deleteHero(hero);
        }
    };

    useEffect(()=>{
        if(heroServer){
           dispatch(setHero(heroServer));
        }
    },[heroServer])

    useEffect(()=>{
        if(delHero){
            navigate(RouteNames.MAIN)
        }
    },[delHero])

    useEffect(()=>{
        if(newHero){
            navigate(RouteNames.MAIN)
        } else {
            console.log(newHeroError);
        }
    },[newHero])

    useEffect(()=>{
        if(updatedHero){
            navigate(RouteNames.MAIN)
        }else {
            console.log(updatedHeroError);
        }
    },[updatedHero])

    return (
        <Container sx={{py: 8}} component="main" maxWidth="xs">
            <Typography variant='h4' align='center' mt={3} color='textPrimary'>{id === -1 ? "Create" : "Edit"} superhero</Typography>

            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField value={hero?.nickname} id="nickname" label="Nickname" required variant="standard"
                               onChange={e => {dispatch(setSupNickname(e.target.value))}}/>

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField value={hero?.real_name} id="real_name" label="Real name" variant="standard"
                               onChange={e => {dispatch(setSupRealName(e.target.value))}}/>
                </Grid>
            </Grid>
            <Box display='flex' flexDirection='column'>
                <TextField value={hero?.origin_description} multiline rows={3} id="origin_description" label="Origin description" variant="standard"
                           onChange={e => {dispatch(setSupOriginDescription(e.target.value))}}/>
                <TextField value={hero?.superpowers} multiline rows={3} id="superpowers" label="Superpowers" variant="standard"
                           onChange={e => {dispatch(setSupSuperpowers(e.target.value))}}/>
                <TextField value={hero?.catch_phrase} multiline rows={2} id="catch_phrase" label="Catch phrase" variant="standard"
                           onChange={e => {dispatch(setSupCatchPhrase(e.target.value))}}/>
                <Grid mt={2}>
                    <Typography variant='h6'>Upload main image:</Typography>
                <TextField
                    onChange={changeFileHandler}
                    type='file'
                    inputProps={{
                        multiple: true
                    }}
                /></Grid>
                {id !== -1 && <Button sx={{mt: 3}} onClick={()=> handleOpen()} variant="contained"><DeleteIcon></DeleteIcon></Button> }
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Do you real want delete hero?
                    </Typography>
                    <Button sx={{mt: 3}} onClick={()=> handleDelete()} variant="contained"><DeleteIcon></DeleteIcon></Button>
                </Box>
            </Modal>
            <Grid mt={3} container justifyContent="flex-end">
                <Button
                    sx={{mr: 3}}
                    type="submit"
                    onClick={()=> handleSubmit()}
                    variant="contained"
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate(RouteNames.MAIN)}
                >
                    Exit
                </Button>
            </Grid>
        </Container>
    );
};

export default HeroEditCreate;
