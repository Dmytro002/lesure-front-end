import * as React from "react";
import {
    CardMedia,
    Grid,
    Typography,
    Card,
    CardContent,
    IconButton
} from "@mui/material";
import imageUrl from "./images/home_image.jpg";
import MiniCalendar from "../components/MiniCalendar";
import HomeCard from "./components/HomeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { styled } from "@mui/material/styles";
import dayjs from "dayjs";


import {  request} from "../../helpers/axios_helper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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



const HomePage = ({ theme, language }) => {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [events, setEvents] = React.useState([]);
    const requestAbortController = React.useRef(null);
    const [clubs, setClubs] = React.useState([]);
    const [clubsSubscription, setClubsSubscription] = React.useState([]);

    const getUser = () => {
        request("GET", "/users", {})
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const getClubsSubscription = () => {
        request("GET", "/subscription", {})
            .then((response) => {
                setClubsSubscription(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const getClubs = () => {
        request("GET", "/event", {})
            .then((response) => {
                setClubs(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    React.useEffect(() => {
        setIsLoading(true);
        getUser();
        getClubs();
        getClubsSubscription();
    }, []);



    const currentDate = new Date();
    const getFormattedDate = (locale) => {
        return currentDate.toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const content = {
        uk: {
            title: "Hello, ",
            body: { formattedDate: getFormattedDate("en-US") },
            car: "My events",
            prom: "All events",
            advice: "Advice",
            cal: "Calendar",
            parts: ["Photography Club", "Book Lovers Club", "Hiking Club", "Coding Club"]
        },
        en: {
            title: "Hello, Pavlo!",
            body: { formattedDate: getFormattedDate("en-US") },
            car: "My events",
            prom: "All events",
            advice: "Advice",
            cal: "Calendar",
            parts: ["Photography Club", "Book Lovers Club", "Hiking Club", "Coding Club"]
        }
    };

    const [calendarValue, setCalendarValue] = React.useState(dayjs());



    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }
        setIsLoading(true);
        setEvents([]);

    };

    return (
        <>
            <CardMedia
                component="img"
                alt="Home Image"
                height="300"
                width="100%"
                image={imageUrl}
                style={{ objectFit: "cover" }}
            />
            <Typography
                variant="h5"
                style={{ position: "absolute", top: "100px", left: "100px", color: "#84adea" }}
            >
                {content[language].title + users.firstName + "!"}
            </Typography>
            <Typography
                variant="body1"
                style={{ position: "absolute", top: "135px", left: "100px", color: "#84adea" }}
            >
                {content[language].body.formattedDate}
            </Typography>
            <Grid
                container
                spacing={4}
                marginTop={-12}
                paddingLeft={{ xs: 1, md: 3 }}
                paddingRight={{ xs: 1, md: 3 }}
            >
                <Grid item sx={{ width: { xs: "100%", md: "calc(100% - 450px)" } }}>
                    <HomeCard theme={theme} title={content[language].car} navigateTo={"subscribtion"} marginTop={10}>
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
                    <HomeCard theme={theme} title={content[language].prom} navigateTo={"events"} marginTop={10}>
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
                            {clubs.map((club, index) => (
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

                <Grid
                    item
                    sx={{
                        width: { xs: "100%", md: "450px", display: "flex", flexDirection: "column", justifyContent: "center" }
                    }}
                >
                    <HomeCard theme={theme} title={content[language].cal} navigateTo={"calendar"}>
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
        </>
    );
};

export default HomePage;
