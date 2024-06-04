import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import avatar from '../../images/avatar.png'

import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

import {request, setAuthHeader} from '../../helpers/axios_helper';

export default function SignInPage({ theme, language, setLogged }) {
  const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    request(
      "POST",
      "/auth/authenticate",
      {
          email: email,
          password: password
      }).then(
          (response) => {
              setErrorMessage('');
              console.log(response);
              setAuthHeader(response.data.access_token);
              setLogged(true);
              navigate('/');
          }).catch(
              (error) => {
                setErrorMessage(content[language].incorrectLogin);
                  setAuthHeader("dima");
              }
          );
  };

  const StyledTextField = styled(TextField)({

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
      signIn: 'Увійти',
        welcome: "З поверненням!",
      email: 'Електронна пошта',
      password: 'Пароль',
      forgPass: 'Забули пароль?',
      remember: "Запам'ятати мене",
      dontHaveAc: "Не маєте акаунту? Зареєструватися",
      incorrectLogin: 'Неправильний логін або пароль',
    },
    en: {
      signIn: 'Sign in',
        welcome: "Welcome back!",
      email: 'Email',
      password: 'Password',
      forgPass: 'Forgot password?',
      remember: 'Remember me',
      dontHaveAc: "Don't have an account? Sign Up",
      incorrectLogin: 'Incorrect login or password',
    }
  }

  const navigate = useNavigate();
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid item xs={12}  component={Paper} elevation={6} square sx={{ backgroundColor:  '#cbdcf7'}}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar variant="square" sx={{ width: '10%', aspectRatio: '10', marginBottom: '30px'  }} src={avatar} />
          <Typography component="h1" variant="h5" style={{ color: 'grey' }}>
            {content[language].welcome}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={content[language].email}
              name="email"
              autoComplete="email"
              autoFocus
              error={errorMessage!==''}
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={content[language].password}
              type="password"
              id="password"
              autoComplete="current-password"
              error={errorMessage!==''}
              helperText={errorMessage}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , backgroundColor: '#1a73e8'}}
            >
              {content[language].signIn}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {content[language].forgPass}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {content[language].dontHaveAc}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
