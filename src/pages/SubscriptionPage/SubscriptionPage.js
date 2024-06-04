import React, { useEffect, useState } from 'react';
import EventCarousel from './components/EventCarousel';
import image from '../../data/test1.jpg';
import {
    Box, Container, Typography, Grid, Button,
} from '@mui/material';
import {
    Schedule, AttachMoney,
} from '@mui/icons-material';
import InfoCard, { getPropertyValue } from '../components/InfoCard.js';
import { request } from '../../helpers/axios_helper';
import Icon from '@mdi/react';
import { mdiFormatListBulletedType, mdiMapMarker, mdiRename, mdiRenameBoxOutline } from '@mdi/js';

const content = {
    uk: {
        configuration: ['Name', 'Description', 'Location', 'Date', 'Category', 'Price'],
        found: 'Found ',
        cars: ' clubs',
        make: 'Make',
    },
    en: {
        configuration: ['Name', 'Description', 'Location', 'Date', 'Category', 'Price'],
        found: 'Found ',
        cars: ' clubs',
        make: 'Make',
    },
};

const icons = [<Icon path={mdiRename} size={1} />, <Icon path={mdiRenameBoxOutline} size={1} />
    , <Icon path={mdiMapMarker} size={1} />, <Schedule />, <Icon path={mdiFormatListBulletedType} size={1} />, <AttachMoney />];
const properties = ['name', 'description', 'location', 'date', 'eventType', 'price'];

const SubscriptionPage = ({ theme, language }) => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(0);
    const [brand, setBrand] = useState('');
    const [makes, setMakes] = useState(['All']);
    const [isLoading, setIsLoading] = useState(true);

    const getEvents = () => {
        request("GET", "/subscription", {}).then(
            (response) => {
                setEvents(response.data);
                setFilteredEvents(response.data);
                setIsLoading(false);
            }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        let makes0 = ['All'];
        for (const car of events) {
            const makeName = getPropertyValue(car.json, properties[0]);
            if (!makes0.includes(makeName)) {
                makes0.push(makeName);
            }
        }
        setMakes(makes0);
    }, [events]);

    const handleUnsubscribe = (subId) => {
        request("DELETE", `/subscription/${subId}`, {}).then(
            () => {
                getEvents();
            }).catch((error) => {
            console.log(error);
        });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    const hasEvents = filteredEvents.length > 0;

    return (
        <Container disableGutters sx={{ padding: 1 }} maxWidth="100%">
            <Container disableGutters maxWidth='100%' sx={{ margin: 0, paddingBlock: 1, paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    color={theme.palette.text.main}
                >
                    {content[language].found}{filteredEvents.length}{content[language].cars}
                </Typography>
                <Box sx={{ minWidth: 120, width: '150px' }}>
                </Box>
            </Container>
            {hasEvents ? (
                <>
                    <Container disableGutters sx={{ margin: 0, paddingLeft: 5, paddingRight: 5 }} maxWidth='100%'>
                        <EventCarousel theme={theme} images={filteredEvents} selectedCar={selectedEvent} setSelectedCar={setSelectedEvent} />
                    </Container>
                    <Grid container spacing={0} sx={{ marginBlock: 2 }}>
                        <Grid item xs={12} md={6}>
                            <InfoCard theme={theme} language={language} title={filteredEvents[selectedEvent].name} icons={icons} configuration={content[language].configuration} properties={properties} json={filteredEvents[selectedEvent]} type='control' />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginBlock: 2, paddingBlock: 5 }}>
                            <Box sx={{
                                width: '90%',
                                height: { md: '200px', lg: '250px' },
                                // paddingBottom: '50%',
                                background: `linear-gradient(to bottom, transparent, rgba(0, 123, 255, 0.37) 100%)`,
                                borderRadius: '50%',
                                filter: 'blur(10px)',
                                position: 'relative',
                                zIndex: 1,
                                top: '30%',
                            }}></Box>
                            <img src={filteredEvents[selectedEvent].imageUrl || image}
                                 alt={filteredEvents[selectedEvent].name}
                                 style={{
                                     width: '60%',
                                     height: 'auto',
                                     zIndex: 2,
                                     position: 'relative',
                                     marginBottom: '55px',
                                     marginTop: '-40%'
                                 }} />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleUnsubscribe(filteredEvents[selectedEvent].id)}
                                sx={{ marginTop: 2 }}
                            >
                                Unsubscribe
                            </Button>
                        </Grid>
                    </Grid>

                </>
            ) : (
                <Typography>No subscription available</Typography>
            )}
        </Container>
    );
};

export default SubscriptionPage;
