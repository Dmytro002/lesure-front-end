import React, {useState} from 'react'


import {
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  ListItemButton,
  ListItem,
  Box,
  Drawer
} from "@mui/material";

import {
  Home,
  SportsSoccer,
  CalendarMonth,

} from "@mui/icons-material"

import { getUserId, request, setAuthHeader, IsLogged } from '../../helpers/axios_helper';

import { useTheme } from "@mui/material/styles";
import { useLanguage } from '../../context/LanguageContext';

import { useNavigate } from "react-router-dom";

import avatar from "../../images/avatar.png"
import DrawerHeader from './DrawerHeader';


const NavigateDrawer = ({ open, handleDrawerOpen }) => {
  const theme = useTheme();
  const { language } = useLanguage();

  const navigate = useNavigate()
  const drawerWidth = 280;
  const miniDrawerWidth = 65;

  const iconsBase = [<Home />]; // Базовые иконки, доступные всем пользователям
  const labelsBase = {
    uk: ['Home'],
    en: ['Home'],
  };
  const linksBase = [''];

  const iconsAuth = [<SportsSoccer />, <CalendarMonth />, <SportsSoccer />]; // Иконки для аутентифицированных пользователей
  const labelsAuth = {
    uk: ['My events', 'Calendar', 'All events'],
    en: ['My events', 'Calendar', 'All events'],
  };
  const linksAuth = ['subscription', 'calendar', 'events'];
  const [isLoading, setIsLoading] = React.useState(false);
  // Объединяем базовые иконки с иконками для аутентифицированных пользователей, если пользователь вошел в систему
  const isUserLogged = IsLogged();
  const icons = isUserLogged ? iconsBase.concat(iconsAuth) : iconsBase;
  const labels = isUserLogged ? {
    uk: labelsBase.uk.concat(labelsAuth.uk),
    en: labelsBase.en.concat(labelsAuth.en),
  } : labelsBase;
  const links = isUserLogged ? linksBase.concat(linksAuth) : linksBase;

  const [user, setUser] = useState([]);
  const getUser = () => {
    request("GET", "/users", {}).then(
        (response) => {
          setUser(response.data)
        }).catch((error) => {
      console.log(error);
      setIsLoading(false); // Обробка помилки

    });
  };

  React.useEffect(() => {
    setIsLoading(true);

    getUser();
  }, []);

  const ListItemStyled = ({ click, style, primary, children, secondary }) => {
    return (
      <ListItem key={primary} disablePadding sx={{ height: '48px' }}>
        <ListItemButton onClick={click}>
          <ListItemIcon style={style}>
            {children}
          </ListItemIcon>
          <ListItemText primary={primary} style={style} secondary={secondary}
            sx={{
              '& .css-83ijpv-MuiTypography-root': {
                color: theme.palette.secondary.main
              }
            }} />
        </ListItemButton>
      </ListItem>
    )
  }
  const firstPathSegment = window.location.href.split('/')[3];

  const drawer = (
    <div>
      {open &&
        <DrawerHeader click={handleDrawerOpen} />
      }
      <Divider />
      <List>
        {

          icons.map((icon, index) => (
            <ListItemStyled key={index} click={() => navigate('/' + links[index])}
              style={{ color: links[index] === firstPathSegment ? theme.palette.primary.main : theme.palette.secondary.main }}
              primary={labels[language][index]}>
              {icon}
            </ListItemStyled>
          ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"

      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, color: "#385f97"  }}
      aria-label="mailbox folders"
    >

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box', width: drawerWidth,
            background: theme.palette.background.default,
          },
          position: 'fixed',
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box', width: miniDrawerWidth,
            background: theme.palette.background.default, marginTop: '64px',
            boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)`
          },
          position: 'fixed',
          zIndex: 1,
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default NavigateDrawer
