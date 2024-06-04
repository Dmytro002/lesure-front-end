import React, { useState } from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Menu, MenuItem } from "@mui/material";
import { AccountCircle, Search as SearchIcon, Login as LoginIcon } from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from '../context/LanguageContext';
import { getUserId, request, setAuthHeader, IsLogged } from '../helpers/axios_helper';
import SettingsDrawer from "./components/SettingsDrawer";
import NavigateDrawer from "./components/NavigateDrawer";
import DrawerHeader from "./components/DrawerHeader";



const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function Navbar({ logged }) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const { language, setLanguage } = useLanguage();
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [openNavigateDrawer, setOpenNavigateDrawer] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const location = useLocation();
    const isEventsFeedPage = location.pathname === "/events";

    const handleSettingsOpen = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setSettingsOpened(open);
    };

    const handleNavigateDrawerOpen = () => {
        setOpenNavigateDrawer(!openNavigateDrawer);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleUserMenuOpen = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorElUser(null);
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            const eventName = event.target.value;
            event.target.value = '';

            if (eventName) {
                navigate(`/event/search?name=${eventName}`);
            } else {
                setOpenAlert(true);
            }
        }
    };

    const content = {
        uk: {
            login: 'Ввійти',
            vinCode: 'Search events',
            error: '',
            errorDesk: '',
            ok: 'Гаразд',
        },
        en: {
            login: 'Sign in',
            vinCode: 'Search events',
            error: 'Search events',
            errorDesk: '',
            ok: 'Ok',
        }
    };

    const getUser = () => {
        request("GET", "/users", {}).then(
            (response) => {
                setUser(response.data);
            }).catch((error) => {
            console.log(error);
            setIsLoading(false); // Handle error
        });
    };

    React.useEffect(() => {
        setIsLoading(true);
        getUser();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ background: "#cbdcf7", zIndex: 200 }}>
                <DrawerHeader click={handleNavigateDrawerOpen} variant='relative'>
                    <Box sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        {IsLogged() && isEventsFeedPage && (
                            <Search sx={{ width: { xs: "100%", md: "40%" }, backgroundColor: '#385f97', "&:hover": { backgroundColor: '#1a73e8' } }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder={content[language].vinCode}
                                    inputProps={{ "aria-label": "search" }}
                                    sx={{ width: '100%' }}
                                    onKeyDown={handleEnterKeyPress}
                                />
                            </Search>
                        )}
                    </Box>
                    <Box>
                        {!IsLogged() &&
                            <Button variant="outlined" startIcon={<LoginIcon />} onClick={() => navigate('/signIn')}
                                    sx={{ fontSize: { xs: 0, md: '0.875rem' } }}>
                                {content[language].login}
                            </Button>
                        }
                        {IsLogged() && (
                            <>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleUserMenuOpen}
                                    color="inherit"
                                    style={{ color: '#385f97' }}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleUserMenuClose}
                                >
                                    <MenuItem onClick={() => navigate('/profile')} style={{ color: 'black' }}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setAuthHeader(null);
                                        navigate('/');
                                        handleUserMenuClose();
                                    }} style={{ color: 'black' }}>
                                        Log out
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                    <SettingsDrawer open={settingsOpened} handleSettingsOpen={handleSettingsOpen} />
                </DrawerHeader>
            </AppBar>
            <NavigateDrawer open={openNavigateDrawer} handleDrawerOpen={handleNavigateDrawerOpen} logged={logged} />
            <Box sx={{
                marginLeft: { xs: '0px', sm: '65px' },
                marginTop: 9,
                marginBottom: 2,
                background: "#cbdcf7",
            }}>
                <Outlet />
            </Box>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
                    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
                    '& .MuiPaper-root': { backgroundColor: theme.palette.background.default },
                    '& .MuiTypography-root': { color: theme.palette.text.primary },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {content[language].error}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content[language].errorDesk}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert} autoFocus>
                        {content[language].ok}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}
