import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {Box, Grid, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import {request} from "../../helpers/axios_helper";
import EventCard from "./EventCard";
import {ReactionProvider} from "./ReactionProvider";


export default function EventsSearchResults({ theme, language }) {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const eventName = query.get('name');
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (eventName) {
            console.log(eventName);
            request("GET", `/event/search?name=${eventName}`, {})

                .then(response => {
                    setEvents(response.data);
                    console.log(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }, [eventName]);

    const handleSelectCategory = (event, newCategory) => {
        if (newCategory !== null) {
            setSelectedCategory(newCategory);
        }
    };

    const filteredClubs = events.filter(club =>
        selectedCategory === 'ALL' || club.eventType === selectedCategory
    );

    const categories = ['ALL', 'SPORTS', 'CONCERT', 'THEATER'];


    return (
    <ReactionProvider>
        <>
            <Box sx={{
                p: 3,
                borderRadius: 1,
                paddingLeft: { xs: 6, sm: 10, md: 32},
                paddingRight: { xs: 6, sm: 10, md: 32 }

            }}
            >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h5" style={{ color: '#000000', textAlign: 'center'  , marginBottom: "20px"}} gutterBottom>
                    </Typography>
                    <ToggleButtonGroup
                        value={selectedCategory}
                        exclusive
                        onChange={handleSelectCategory}
                        aria-label="category filter"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2,
                            '& .MuiToggleButton-root': {
                                textTransform: 'none',
                                fontWeight: 'normal',
                                color: 'primary.main',
                                '&.Mui-selected': {
                                    color: 'secondary.main',
                                    borderBottom: '2px solid'
                                }
                            }
                        }}
                    >
                        {categories.map(category => (
                            <ToggleButton key={category} value={category} sx={{ textTransform: 'none', fontWeight: 'bold' }} aria-label={category.toLowerCase()}>
                                {category}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
                <Typography variant="h5" style={{ color: '#000000', textAlign: 'center' , marginBottom: "20px"}}>
                    Most popular events
                </Typography>
                {isLoading ? (
                    <Typography variant="h6" style={{ color: '#000000', textAlign: 'center' }}>
                        Loading...
                    </Typography>
                ) : (
                    <Grid container spacing={2}>
                        {filteredClubs.map(club => (
                            <Grid item key={club.id} xs={12} sm={6} md={4} lg={3} >
                                <EventCard theme={theme} club={club} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    </ReactionProvider>
    );
}
