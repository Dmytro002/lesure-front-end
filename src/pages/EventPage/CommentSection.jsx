import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { request } from "../../helpers/axios_helper";

const CommentSection = ({ comments, eventId }) => {
    const [newComment, setNewComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem(`comments_${eventId}`)) || [];
        setAllComments([...storedComments, ...comments]);
    }, [eventId, comments]);

    useEffect(() => {
        localStorage.setItem(`comments_${eventId}`, JSON.stringify(allComments));
    }, [allComments, eventId]);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const commentData = {
            eventId: eventId,
            text: newComment,
        };

        setAllComments([...allComments, commentData]);
        setNewComment('');

        request('POST', '/comment', { ...commentData})
            .catch((error) => {
                console.error('Failed to create comment', error);
                setAllComments(allComments.filter(c => c.text !== commentData.text));
            });
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>Comments</Typography>
            <form onSubmit={handleCommentSubmit}>
                <TextField
                    name="text"
                    label="Add a comment"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
            <Divider sx={{ my: 2 }} />
            <List>
                {allComments.map((comment, index) => (
                    <ListItem key={index} alignItems="flex-start">
                        <ListItemText
                            primary={
                                <>
                                    <Typography variant="subtitle2" color="textPrimary">
                                        By {comment.firstName} {comment.lastName}
                                    </Typography>
                                    <Typography variant="body1">{comment.text}</Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default CommentSection;
