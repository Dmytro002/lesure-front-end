import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import avatar from '../../images/avatar.png'
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';

import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import ImageInput from '../components/ImageInput';

import { getUserId, request, setAuthHeader } from '../../helpers/axios_helper';

const SignUpPage = ({ theme, language, setLogged }) => {

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [register, setRegister] = React.useState(true);

    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        const name = data.get('firstName');

        const lastName = data.get('lastName');
        const email = data.get('email');

        if (email === undefined || !email.includes('@')) {
            setErrorEmail(true);
            return;
        }
        const password = data.get('password');
        let regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (password === undefined || !regex.test(password)) {
            setErrorPassword(true);
            return;
        }

        request(
            "POST",
            "/auth/register",
            {
                firstname: name,
                lastname: lastName,
                email: email,
                password: password,
                role: '0'
            }).then(
            (response) => {
                setAuthHeader(response.data.access_token);
                setLogged(true);
                setRegister(false);
            }).catch(
            (error) => {
                setAuthHeader(null);
            }
        );

        navigate('/');
    };

    const handleSubmitAvatar = (event) => {
        event.preventDefault();
        if (selectedImage) {
            request("POST", `/users/${getUserId()}/uploadImage`, {
                image: selectedImage,
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        navigate('/');
    }


    const StyledTextField = styled(TextField)({

        // Колір введеного тексту
        '& input': {
            color: theme.palette.text.primary,
        },

        '& fieldset': {
            borderColor: theme.palette.secondary.main,
        },

        "label": {
            color: theme.palette.secondary.main
        }
    });

    const content = {
        uk: {
            signUp: 'Sign Up',
            firstName: "First Name",
            lastName: "Last Name",
            email: 'Email',
            password: 'Password',
            reseiveProm: 'I want to receive offers, promotions and updates by email.',
            haveAc: 'Already have an account? Sign in',
            avatar: 'Load avatar',
            upload: 'Upload'
        },
        en: {
            signUp: 'Sign Up',
            firstName: "First Name",
            lastName: "Last Name",
            email: 'Email',
            password: 'Password',
            reseiveProm: 'I want to receive offers, promotions and updates by email.',
            haveAc: 'Already have an account? Sign in',
            avatar: 'Load avatar',
            upload: 'Upload'
        }
    }

    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);


    return (
        <Grid container component="main" sx={{ height: '100vh' }} >
            <CssBaseline />

            <Grid item xs={12}  component={Paper} elevation={6} square sx={{ backgroundColor: theme.palette.background.default }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar variant="square" sx={{ width: '10%', aspectRatio: '10', marginBottom: '30px'  }} src={selectedImage ? URL.createObjectURL(selectedImage) : avatar} />
                    <Typography component="h1" variant="h5">
                        {content[language].signUp }
                    </Typography>
                    {register &&
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container justifyContent="center">
                                <Grid item xs={12} md={8} lg={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <StyledTextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label={content[language].firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <StyledTextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label={content[language].lastName}
                                                name="lastName"
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <StyledTextField
                                                required
                                                fullWidth
                                                id="email"
                                                label={content[language].email}
                                                name="email"
                                                autoComplete="email"
                                                error={errorEmail}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <StyledTextField
                                                required
                                                fullWidth
                                                name="password"
                                                label={content[language].password}
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                error={errorPassword}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                {content[language].signUp}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                                            <Link href="/signIn" variant="body2">
                                                {content[language].haveAc}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>


                    }
                </Box>
            </Grid>
        </Grid >
    )
}

export default SignUpPage;
