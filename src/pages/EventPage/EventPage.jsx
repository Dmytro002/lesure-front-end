import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardMedia,
    Typography,
    CircularProgress,
    Grid,
    Button,
    Box,
    List,
    ListItem, ListItemIcon, ListItemText, CardContent
} from '@mui/material';
import { request } from "../../helpers/axios_helper";
import CommentSection from "./CommentSection";
import InfoCard, {getPropertyValue} from "../components/InfoCard";
import {AttachMoney, LocalGasStation, Schedule, Sell, TimesOneMobiledata, TimeToLeave} from "@mui/icons-material";
import {mdiFormatListBulletedType, mdiMapMarker, mdiRename, mdiRenameBoxOutline} from "@mdi/js";
import Icon from "@mdi/react";

const icons = [<Icon path={mdiRename} size={1} />, <Icon path={mdiRenameBoxOutline} size={1} />
    , <Icon path={mdiMapMarker} size={1} />, <Schedule />, <Icon path={mdiFormatListBulletedType} size={1} />, <AttachMoney />];
const properties = ['name', 'description', 'location', 'date', 'eventType', 'price'];

const content = {
    uk: {
        configuration: ['Name', 'Description', 'Location', 'Date', 'Category', 'Price'],
    },
    en: {
        configuration: ['Name', 'Description', 'Location', 'Date', 'Category', 'Price'],
    },
};

const EventPage = ({ theme, language = 'en' }) => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const subscribeToEvent = (eventId) => {
        request('POST', `/subscription/${eventId}`)
            .then(() => {
                setIsSubscribed(true);
            }).catch((error) => {
            console.error('Failed to subscribe to event', error);
        });
    };

    const checkSubscriptionStatus = (eventId) => {
        request('GET', `/subscription/${eventId}/status`)
            .then((response) => {
                setIsSubscribed(response.data);
            }).catch((error) => {
            console.error('Failed to check subscription status', error);
        });
    };

    useEffect(() => {
        if (!eventId) {
            setError('Event ID is undefined');
            setLoading(false);
            return;
        }

        const getEventDetails = (eventId) => {
            request('GET', `/event/${eventId}`, null)
                .then((response) => {
                    setEvent(response.data);
                    setLoading(false);
                }).catch((error) => {
                setError('Failed to fetch event');
                setLoading(false);
            });
        };

        getEventDetails(eventId);
        checkSubscriptionStatus(eventId);
    }, [eventId]);

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Error: {error}</Typography>;

    return (
        <Box sx={{ width: '100%', padding: 3, display: 'flex', justifyContent: 'center', color: '#cbdcf7' }}>
            <Card sx={{
                width: '100%',
                maxWidth: 1200,
                background: '#cbdcf7',
                color: '#84adea',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: '0.3s',
                "&:hover": {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                },
                borderRadius: 2,
                overflow: 'hidden'
            }}>
                <Grid container spacing={4} sx={{ padding: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            sx={{ color: '#000000', textAlign: 'center', mb: 2 }}
                        >
                            {event.name}
                        </Typography>
                        <CardMedia
                            component="img"
                            height="250"
                            image={event.imageUrl}
                            alt={event.name}
                            sx={{ borderRadius: 1, objectFit: 'cover', marginBottom: 4 }}
                        />
                        {isSubscribed ? (
                            <Typography
                                variant="body1"
                                sx={{ color: '#1a73e8', mt: 2, textAlign: 'center' }}
                            >
                                You are already subscribed to this event.
                            </Typography>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => subscribeToEvent(eventId)}
                                sx={{ mt: 4, display: 'block', margin: 'auto' }}
                            >
                                Subscribe
                            </Button>
                        )}

                        <Typography
                            variant="body1"
                            sx={{ color: '#000000', textAlign: 'center', mt: 2 }}
                        >
                            {event.description}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <List sx={{marginLeft: '40px'}}>
                                <Grid container spacing={0}>
                                    {icons.map((icon, index) => (
                                        <Grid item xs={6} sm={12}>
                                            <ListItem key={index}>
                                                <ListItemIcon sx={{color: theme.palette.secondary.main}}>
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={getPropertyValue(event, properties[index], content[language].none).toString().toLowerCase()}
                                                    secondary={content[language].configuration[index]}
                                                    sx={{
                                                        '& .css-83ijpv-MuiTypography-root': {
                                                            color: theme.palette.secondary.main
                                                        }
                                                    }}
                                                />

                                            </ListItem>
                                        </Grid>
                                    ))}
                                </Grid>
                            </List>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <CommentSection comments={event.comments} eventId={eventId} />
                    </Grid>

                </Grid>
            </Card>
        </Box>
    );
};

export default EventPage;









// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, CardMedia, Typography, CircularProgress, useTheme, Grid } from '@mui/material';
// import { request } from '../../helpers/axios_helper';
//
// const EventPage = () => {
//     const theme = useTheme();
//     const { eventId } = useParams();
//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     const fetchEvent = () => {
//         console.error("eventId" + eventId);
//         request('GET', '/event/${eventId}', null)
//             .then((response) => {
//                 setEvent(response.data);
//                 setLoading(false);
//             }).catch((error) => {
//             console.error("error");
//             console.error(error);
//             setLoading(false);
//         });
//     };
//
//     useEffect(() => {
//         fetchEvent();
//     }, []);
//
//     // const fetchEvent = async () => {
//     //     setLoading(true);
//     //     try {
//     //         const response = await request('GET', `/event/${eventId}`);
//     //         setEvent(response.data);
//     //         setLoading(false);
//     //     } catch (error) {
//     //         console.error('Failed to fetch event', error);
//     //         setLoading(false);
//     //     }
//     // };
//     //
//     // useEffect(() => {
//     //
//     //
//     //     fetchEvent();
//     // }, [eventId]);
//
//     if (loading) return <CircularProgress />;
//
//     return (
//         <div style={{ width: '100%', margin: 3 }}>
//             <Card sx={{
//                 background: '#84adea',
//                 color: theme.palette.secondary2.main,
//                 "&:hover": {
//                     backgroundColor: theme.palette.secondary2.dark
//                 }
//             }}>
//                 <Grid container spacing={2} sx={{ padding: 3 }}>
//                     <Grid item xs={12} md={3}>
//                         <CardMedia
//                             component="img"
//                             height="250"
//                             image={event.imageUrl}
//                             alt={event.name}
//                             style={{ width: '100%', height: 'auto' }}
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                         <Typography
//                             gutterBottom
//                             variant="h4"
//                             component="div"
//                             sx={{ color: theme.palette.text.primary, textAlign: 'center', mb: 2 }}
//                         >
//                             {event.name}
//                         </Typography>
//                         <Typography
//                             variant="body1"
//                             sx={{ color: theme.palette.text.primary, textAlign: 'center', mb: 2 }}
//                         >
//                             {event.description}
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Card>
//         </div>
//     );
// };
//
// export default EventPage;

