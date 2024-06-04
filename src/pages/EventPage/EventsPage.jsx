import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Grid, ToggleButtonGroup, ToggleButton, Typography, Box } from '@mui/material';
import {ReactionProvider} from "./ReactionProvider";
import {request} from "../../helpers/axios_helper";

const EventsPage = ({ theme, language }) => {
    const [clubs, setClubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [isLoading, setIsLoading] = useState(true);

    const getClubs = () => {
        request('GET', '/event', null)
            .then((response) => {
                setClubs(response.data);
                setIsLoading(false);
            }).catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        getClubs();
    }, []);

    const handleSelectCategory = (event, newCategory) => {
        if (newCategory !== null) {
            setSelectedCategory(newCategory);
        }
    };

    const filteredClubs = clubs.filter(club =>
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
                    <Typography variant="h5" style={{ color: theme.palette.text.primary, textAlign: 'center'  , marginBottom: "20px"}} gutterBottom>

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
                <Typography variant="h5" style={{ color: theme.palette.text.primary, textAlign: 'center' , marginBottom: "20px"}}>
                    Most popular events
                </Typography>
                {isLoading ? (
                    <Typography variant="h6" style={{ color: theme.palette.text.primary, textAlign: 'center' }}>
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
};

export default EventsPage;
