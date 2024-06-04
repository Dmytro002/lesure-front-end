import React, { useState, useEffect, useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, Box } from '@mui/material';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { ReactionContext } from "./ReactionProvider";
import { useNavigate } from "react-router-dom";

const EventCard = ({ theme, club }) => {
    const navigate = useNavigate();
    const { userReactions, handleReaction } = useContext(ReactionContext);
    const userReaction = userReactions[club.id];
    const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(`likes_${club.id}`)) || club.reactionResponse.likes || 0);
    const [dislikes, setDislikes] = useState(() => parseInt(localStorage.getItem(`dislikes_${club.id}`)) || club.reactionResponse.dislikes || 0);

    useEffect(() => {
        localStorage.setItem(`likes_${club.id}`, likes);
        localStorage.setItem(`dislikes_${club.id}`, dislikes);
    }, [likes, dislikes, club.id]);

    const handleLike = () => {
        if (userReaction === 'LIKE') {
            handleReaction(club.id, null);
            setLikes(likes - 1);
        } else {
            handleReaction(club.id, 'LIKE');
            if (userReaction === 'DISLIKE') {
                setDislikes(dislikes - 1);
            }
            setLikes(likes + 1);
        }
    };

    const handleDislike = () => {
        if (userReaction === 'DISLIKE') {
            handleReaction(club.id, null);
            setDislikes(dislikes - 1);
        } else {
            handleReaction(club.id, 'DISLIKE');
            if (userReaction === 'LIKE') {
                setLikes(likes - 1);
            }
            setDislikes(dislikes + 1);
        }
    };

    return (
        <Card sx={{
            background: '#84adea',
            color: theme.palette.secondary2.main,
            "&:hover": {
                backgroundColor: theme.palette.secondary2.dark
            }
        }} onClick={() => navigate(`/event/${club.id}`)}>
            <CardMedia
                component="img"
                height="140"
                image={club.imageUrl}
                alt={club.name}
                sx={{ opacity: 0.9 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>
                    {club.name}
                </Typography>
            </CardContent>

            <CardActions sx={{
                justifyContent: 'center',
                gap: '20px',
                borderTop: '3px solid #ccc',
                pt: '10px'
            }}>
                <IconButton onClick={(e) => { e.stopPropagation(); handleLike(); }} color={userReaction === 'LIKE' ? "primary" : "default"}>
                    <ThumbUpAltIcon /> {likes}
                </IconButton>
                <Box sx={{ width: '3px', backgroundColor: '#ccc', height: '35px', alignSelf: 'center' }} />
                <IconButton onClick={(e) => { e.stopPropagation(); handleDislike(); }} color={userReaction === 'DISLIKE' ? "primary" : "default"}>
                    <ThumbDownAltIcon /> {dislikes}
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default EventCard;
