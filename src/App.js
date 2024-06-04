import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar"
import StartPage from "./pages/StartPage/StartPage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLanguage } from './context/LanguageContext';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import HomePage from './pages/HomePage/HomePage';
import UserProfile from './pages/UserProfile/UserProfile';
import { IsLogged } from './helpers/axios_helper';
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import EventsSearchResults from "./pages/EventPage/EventsSearchResults";
import EventPage from "./pages/EventPage/EventPage";
import * as PropTypes from "prop-types";
import EventsPage from "./pages/EventPage/EventsPage";

function ClubsFeed(props) {
  return null;
}

ClubsFeed.propTypes = {
  theme: PropTypes.any,
  language: PropTypes.any
};

function App() {
  
  const { language, setLanguage } = useLanguage();

  const [logged, setLogged] = React.useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#385f97',
      },
      secondary: {
        main: '#1a73e8',
      },
      secondary2: {
        main2: '#84adea',
      },
      background: {
        default: '#cbdcf7',
      },
      error: {
        main: '#ff0000',
      },
      success: {
        main: '#21ff00',
      },
      warning: {
        main: '#7633b9',
      },
      text: {
        primary: '#000000',
      },
      common: {
        white: '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar logged={logged}/>}>
            <Route index element={IsLogged() ? <HomePage theme={theme} language={"en"}/> : <StartPage />} />
            <Route path="subscription" element={<SubscriptionPage theme={theme} language={"en"}/>} />
            <Route path="calendar" element={<CalendarPage theme={theme} language={"en"}/>} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="/event/search" element={<EventsSearchResults theme={theme} language={"en"}/>} />
            <Route path="event/:eventId" element={<EventPage theme={theme} language={"en"}/>} />
            <Route path="home" element={<HomePage theme={theme} language={"en"}/>} />
            <Route path="events" element={<EventsPage theme={theme} language={"en"}/>} />
          </Route>
          <Route path="/signIn" element={<SignInPage theme={theme} language={"en"} setLogged={setLogged}/>} />
          <Route path="/signUp" element={<SignUpPage theme={theme} language={"en"} setLogged={setLogged}/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
