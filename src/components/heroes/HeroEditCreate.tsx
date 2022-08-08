import React, {useEffect, useState} from 'react';
import {Box, Button, Collapse, Container, Grid, Modal, Snackbar, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {superheroAPI} from "../../services/superhero.service";
import {RouteNames} from "../../router";
import {useNavigate} from "react-router-dom";
import {IImagesArray, superheroSlice} from "../../store/reducers/SuperheroSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {isErrorWithMessage} from "../../helpers/main.helpers";
import Alert from "../elements/Alert";
import HeroPhotoGallery from "../images/HeroPhotoGallery";
import ExpandMore from "../elements/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    const {id, superhero: hero, images_array, removeImg, mainImg} = useAppSelector(state => state.superheroReducer);
    const {data: heroServer, error: heroError, isLoading} = superheroAPI.useFetchOneQuery(id);
    const {
        setHero, setSupNickname, setSupSuperpowers, setSupOriginDescription,
        setSupRealName, setSupCatchPhrase, addToRemoveImg, resetSup, setMainImg
    } = superheroSlice.actions;
    const dispatch = useAppDispatch();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
        setErrorMessage('');
    };

    const addToRemoveImgHandle = (tile: IImagesArray) => {
        dispatch(addToRemoveImg(tile.img));
    }

    const addToMainImgHandle = (tile: IImagesArray) => {
        dispatch(setMainImg(tile.img));
    }

    const [createHero, {
        data: newHero,
        error: newHeroError,
        isError: isErrorNewHero
    }] = superheroAPI.useCreateMutation();

    const [updateHero, {data: updatedHero, error: updatedHeroError}] = superheroAPI.useUpdateMutation();
    const [deleteHero, {data: delHero, error: delHeroError}] = superheroAPI.useDeleteMutation();

    const changeFileHandler = (event: any) => {
        if (event.target && event.target.files) {
            setSelectedFiles(event.target.files);
            setIsFilePicked(true);
        }
    };

    const handleSubmit = async () => {
        let data = new FormData();
        if (selectedFiles.length) {
            for (const indexFile in selectedFiles) {
                data.append('images', selectedFiles[indexFile]);
            }
        }
        data.append("author_id", user.id.toString());
        data.append("nickname", hero.nickname);
        data.append("real_name", hero.real_name);
        data.append("origin_description", hero.origin_description);
        data.append("superpowers", hero.superpowers);
        data.append("catch_phrase", hero.catch_phrase);
        data.append("main_image", mainImg);
        data.append("remove_images", removeImg);
        if (id === -1) {
            createHero(data);
        } else {
            updateHero({hero: data, id: hero.id});
        }
    };

    const handleDelete = async () => {
        if (id !== -1) {
            deleteHero(hero);
        }
    };

    useEffect(() => {
        if (heroServer) {
            dispatch(setHero(heroServer));
        }
        if (heroError) {
            if ('data' in heroError) {
                setErrorMessage(JSON.stringify(heroError.data));
            } else if (isErrorWithMessage(heroError)) {
                setErrorMessage(heroError.message);
            }
            setOpenAlert(true);
        }
    }, [heroServer])

    useEffect(() => {
        if (delHero) {
            dispatch(resetSup());
            navigate(RouteNames.MAIN);
        }
        if (delHeroError) {
            if ('data' in delHeroError) {
                setErrorMessage(JSON.stringify(delHeroError.data));
            } else if (isErrorWithMessage(delHeroError)) {
                setErrorMessage(delHeroError.message);
            }
            setOpenAlert(true);
        }
    }, [delHero])

    useEffect(() => {
        if (newHero) {
            dispatch(resetSup());
            navigate(RouteNames.MAIN)
        }
        if (newHeroError) {
            if ('data' in newHeroError) {
                setErrorMessage(JSON.stringify(newHeroError.data));
            } else if (isErrorWithMessage(newHeroError)) {
                setErrorMessage(newHeroError.message);
            }
            setOpenAlert(true);
        }
    }, [newHero, newHeroError, isErrorNewHero])

    useEffect(() => {
        if (updatedHero) {
            dispatch(resetSup());
            navigate(RouteNames.MAIN)
        }
        if (updatedHeroError) {
            if ('data' in updatedHeroError) {
                setErrorMessage(JSON.stringify(updatedHeroError.data));
            } else if (isErrorWithMessage(updatedHeroError)) {
                setErrorMessage(updatedHeroError.message);
            }
            setOpenAlert(true);
        }
    }, [updatedHero, updatedHeroError])

    return (
        <Container sx={{py: 8}} component="main" maxWidth="xs">
            <Typography variant='h4' align='center' mt={3}
                        color='textPrimary'>{id === -1 ? "Create" : "Edit"} superhero</Typography>

            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField value={hero?.nickname} id="nickname" label="Nickname" required variant="standard"
                               onChange={e => {
                                   dispatch(setSupNickname(e.target.value))
                               }}/>

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField value={hero?.real_name} id="real_name" label="Real name" variant="standard"
                               onChange={e => {
                                   dispatch(setSupRealName(e.target.value))
                               }}/>
                </Grid>
            </Grid>
            <Box display='flex' flexDirection='column'>
                <TextField value={hero?.origin_description} multiline rows={3} id="origin_description"
                           label="Origin description" variant="standard"
                           onChange={e => {
                               dispatch(setSupOriginDescription(e.target.value))
                           }}/>
                <TextField value={hero?.superpowers} multiline rows={3} id="superpowers" label="Superpowers"
                           variant="standard"
                           onChange={e => {
                               dispatch(setSupSuperpowers(e.target.value))
                           }}/>
                <TextField value={hero?.catch_phrase} multiline rows={2} id="catch_phrase" label="Catch phrase"
                           variant="standard"
                           onChange={e => {
                               dispatch(setSupCatchPhrase(e.target.value))
                           }}/>
                <Grid mt={2}>
                    <Typography variant='h6'>Upload images:</Typography>
                    <TextField
                        onChange={changeFileHandler}
                        type='file'
                        inputProps={{
                            multiple: true
                        }}
                    /></Grid>

            </Box>

            <Grid mt={3} container>
                <ExpandMore
                    onClick={handleExpandClick}
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore> <Button
                sx={{flexGrow: 1}}
                onClick={handleExpandClick}>Edit photo gallery</Button></Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <HeroPhotoGallery edit={true} addToRemoveImg={addToRemoveImgHandle}
                                      addAsMainImg={addToMainImgHandle} itemData={images_array}/>
                </Collapse>
            </Grid>
            {id !== -1 && <Button sx={{mt: 3}} onClick={() => handleOpen()}
                                  variant="contained"><DeleteIcon></DeleteIcon></Button>}
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
                    <Button sx={{mt: 3}} onClick={() => handleDelete()}
                            variant="contained"><DeleteIcon></DeleteIcon></Button>
                </Box>
            </Modal>
            <Grid mt={3} container justifyContent="flex-end">
                <Button
                    sx={{mr: 3}}
                    type="submit"
                    onClick={() => handleSubmit()}
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


            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>

        </Container>
    );
};

export default HeroEditCreate;
