import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {FC} from "react";
import {Button, Dialog, Grid, makeStyles, Slide, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from '@mui/icons-material/Close';
import {IImagesArray} from "../../store/reducers/SuperheroSlice";
import {useAppSelector} from "../../hooks/redux";


interface IHeroGallery {
    itemData: IImagesArray[];
    edit?: boolean;
    addToRemoveImg?: (arg0: IImagesArray) => void;
    addAsMainImg?: (arg0: IImagesArray) => void;
}



const HeroPhotoGallery: FC<IHeroGallery> = ({itemData, edit = false,
                                            addToRemoveImg, addAsMainImg}) => {


    const [selectedTile, setSelectedTile] = React.useState({img:'', title:''});

    const {removeImg} = useAppSelector(state => state.superheroReducer);

    const handleClickOpen = (itm: IImagesArray) => {
        setSelectedTile(itm);
    };

    const handleClose = () => {
        setSelectedTile({img:'', title:''});
    };

    return (
        <div>
        <Box sx={{height: 450, overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={10}>
                {itemData.map((item) => (
                    <div key={item.img}>
                        {edit && removeImg.includes(item.img) ?
                            <ImageListItem  sx={{border:'5px solid Plum'}}>
                                <img
                                    src={`${process.env.REACT_APP_SERVER_URL}${item.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${process.env.REACT_APP_SERVER_URL}${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    onClick={() => handleClickOpen(item)}
                                    loading="lazy"
                                />
                            </ImageListItem>
                            :
                            <ImageListItem >
                            <img
                                src={`${process.env.REACT_APP_SERVER_URL}${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${process.env.REACT_APP_SERVER_URL}${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                onClick={() => handleClickOpen(item)}
                                loading="lazy"
                            />
                            </ImageListItem>
                        }
                    </div>
                ))}
            </ImageList>
        </Box>
        <Dialog
            open={selectedTile.img !== ''}
            onClose={handleClose}
        >
            <AppBar>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    {edit && addToRemoveImg && <Button autoFocus color="inherit" onClick={() =>
                        {addToRemoveImg(selectedTile); handleClose()}}>
                        Delete image
                    </Button>}
                    {edit && addAsMainImg && <Button autoFocus color="inherit" onClick={() =>
                    {addAsMainImg(selectedTile); handleClose()}}>
                        As main image
                    </Button>}
                </Toolbar>
            </AppBar>

            {selectedTile && (
                <img src={`${process.env.REACT_APP_SERVER_URL}${selectedTile.img}?w=248&fit=crop&auto=format`} alt={selectedTile.title} />
            )}
        </Dialog>
        </div>
    );
}


export default HeroPhotoGallery;
