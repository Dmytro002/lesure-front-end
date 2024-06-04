import React, { useState } from 'react';
import {
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  Typography, CardMedia, IconButton,
} from '@mui/material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useLanguage } from "../../context/LanguageContext";

import { getUserId, request, setAuthHeader } from '../../helpers/axios_helper';
import HomeCard from "../HomePage/components/HomeCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {styled} from "@mui/material/styles";
import Slider from "react-slick";
import MiniCalendar from "../components/MiniCalendar";
import dayjs from "dayjs";
function getUser(id) {
  request("GET", `/users/${id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
}

function updateUser(userData) {
  request(
      "PATCH",
      `/users`,
      {email: userData.email}
  ).then(
      response => {
        console.log("User updated successfully", response);
      }
  ).catch(
      error => {
        console.error("Error updating user", error);
      }
  );
}


const PrevArrow = (props) => {
  const { onClick } = props;
  return (
      <IconButton
          onClick={onClick}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 1
          }}
      >
        <ArrowBackIosIcon />
      </IconButton>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
      <IconButton
          onClick={onClick}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 1
          }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
  );
};

const StyledSlider = styled(Slider)`
  .slick-prev,
  .slick-next {
    z-index: 1;
    &:before {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 30px;
    }
  }
`;



const UserProfile = ( ) => {
  const { language } = useLanguage();
  const theme = useTheme();
  const [userAvatar, setUserAvatar] = useState(null);
  const [user, setUser] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [clubsSubscription, setClubsSubscription] = React.useState([]);
  const getClubsSubscription = () => {
    request("GET", "/subscription", {})
        .then((response) => {
          console.log(response.data);
          setClubsSubscription(response.data);
          console.log(clubsSubscription);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
  };


  const getUser = () => {
    request("GET", "/users", {}).then(
        (response) => {
          setUser(response.data)
        }).catch((error) => {
      console.log(error);
    });
  };


  const content={
    uk:{
      photo: "Upload photo",
      wal:"Wallet",
      sub:"Subscriptions",
      del:"Delete photo",
        car: "My events",
        cal: "Calendar",
    },
    en:{
      photo: "Upload photo",
      wal:"Wallet",
      sub:"Subscriptions",
        car: "My events",
        cal: "Calendar",
      del:"Delete photo"
    }
  }


    const requestAbortController = React.useRef(null);
    function getEvents(month, year) {
        console.log("Making request with month:", month, "and year:", year);

        return request("GET", `/events?month=${month}&year=${year}`)
            .then((response) => {
                console.log("Fetched data:", response.data.content);
                if (!Array.isArray(response.data.content)) {
                    throw new Error("Response is not an array");
                }

                return response.data.content;
            })
            .catch((error) => {
                console.log("Error:", error);
                throw error;
            });
    }


    const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePhoto = () => {
    setUserAvatar(null);
    handleMenuClose();
  };
  React.useEffect(() => {

    getUser();
    getClubsSubscription();
  }, []);

    const currentDate = new Date();
    const [events, setEvents] = React.useState([]);

    const fetchEvents2 = (date) => {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            getEvents(date.month() + 1, date.year())
                .then((events) => {
                    resolve(events);
                })
                .catch((error) => {
                    if (error.name !== "AbortError") {
                        console.error("Failed to fetch events:", error);
                        reject(error);
                    }
                });
        });
    };
    const getFormattedDate = (locale) => {
        return currentDate.toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const [calendarValue, setCalendarValue] = React.useState(dayjs());

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }
        setIsLoading(true);
        setEvents([]);
        fetchEvents2(date);
    };

    React.useEffect(() => {
        setIsLoading(true);
        fetchEvents2(calendarValue, { signal: requestAbortController.current?.signal })
            .then((events) => {
                console.log("Events:", events);
                setEvents(events);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch events:", error);
                setIsLoading(false);
            });

        return () => requestAbortController.current?.abort();
    }, [calendarValue]);

  return (
    <Container maxWidth="100%" sx={{ background: theme.palette.background.default }}>
    <Grid container spacing={2}>
    <Grid item xs={12} md={8} >
        <Card sx={{ background: theme.palette.background.default, height: 225 }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h4" component="div" color='#385f97' align="center">
                        <div>{user.firstName} {user.lastName}</div>
                    </Typography>
                    <Typography variant="h6" component="div" color='#385f97' align="center">
                        <div>{user.email}</div>
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                        <Button sx={{ width: 220 }} variant="text" component="span">
                            {content[language].photo}
                            <AddPhotoAlternateIcon />
                        </Button>
                        <Button sx={{ width: 220 }} variant="text" component="span">
                            {content[language].wal}
                            <AccountBalanceWalletIcon />
                        </Button>
                        <Button sx={{ width: 220 }} variant="text" component="span">
                            {content[language].sub}
                            <SubscriptionsIcon />
                        </Button>
                    </div>
                </CardContent>
            </Container>
        </Card>
        <HomeCard theme={theme} title={content[language].car} navigateTo={"/garage"} marginTop={10}>
        <StyledSlider
                dots={false}
                infinite={true}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                arrows={true}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
            >
                {clubsSubscription.map((club, index) => (
                    <div key={index}>
                        <Card
                            sx={{
                                width: "200px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                background: "#84adea"
                            }}
                        >
                            <CardMedia
                                image={club.imageUrl}
                                title={club.name}
                                component="img"
                                width="100%"
                                style={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    style={{ color: theme.palette.text.primary, textAlign: "center" }}
                                >
                                    {club.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </StyledSlider>
        </HomeCard>
    </Grid>

    <Grid item xs={12} md={4} >
        <HomeCard theme={theme} title={content[language].cal} navigateTo={"/calendar"}>

        <MiniCalendar
                theme={theme}
                language={language}
                value={calendarValue}
                setValue={setCalendarValue}
                handleMonthChange={handleMonthChange}
                highlightedDays={clubsSubscription}
                isLoading={isLoading}
                size="large"
            />
        </HomeCard>


    </Grid>
  </Grid>
</Container>
  );
};

export default UserProfile;
