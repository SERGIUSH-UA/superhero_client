import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {RouteNames} from "../../router";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {superheroSlice} from "../../store/reducers/SuperheroSlice";
import {Grid, Link} from "@mui/material";
import {userSlice} from "../../store/reducers/UserSlice";

interface MainAppBarInterface {
    // user: IUser | undefined;
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const MainAppBar: FC<MainAppBarInterface> = () => {
    const {user} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();

    const {setOnlyRead, setId, resetSup} = superheroSlice.actions;
    const {reset} = userSlice.actions;
    const dispatch = useAppDispatch();

    const logout = () => {
        localStorage.removeItem('TOKEN');
        dispatch(reset());
        navigate(RouteNames.LOGIN);
    }

    const handleAddClick = () => {
        dispatch(setOnlyRead(false));
        dispatch(setId(-1));
        dispatch(resetSup());
        navigate(RouteNames.EDIT);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" >
                <Toolbar>
                    {user.id !== 0 && <IconButton
                        onClick={()=> handleAddClick()}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <PersonAddIcon />
                    </IconButton> }
                    <Typography onClick={()=> navigate(RouteNames.MAIN)} variant="body1" component="div" sx={{ flexGrow: 1 ,
                        cursor: 'pointer', display: {xs: 'none', sm: 'block'}}}>
                        {process.env.REACT_APP_SITE_NAME}
                    </Typography>
                    <Grid  container justifyContent="flex-end">
                        <Grid item>
                    <Link href={RouteNames.DOC}  variant="body2">
                        <Typography color={'white'}>Documentation</Typography>
                    </Link></Grid></Grid>
                    <Search sx={{display: 'none'}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {user.id ? <Button sx={{ml:3}} color="inherit" onClick={() => logout()}>Logout, {user.username}!</Button>
                        :
                        <Button sx={{ml:3}} color="inherit" href={RouteNames.LOGIN}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MainAppBar;