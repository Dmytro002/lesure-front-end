import * as React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import imageUrl from "./image/event.png";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../../context/LanguageContext";
import TabsBlock from "./components/TabsBlock";

export default function StartPage() {
  const theme = useTheme();
  const { language, setLanguage } = useLanguage();

  const cardContentStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const content = {
    uk: {
      title: "Your personal leisure assistant!",
      body: `Looking for the most convenient way to track events
    and ensure an exciting leisure time? LESURE is
    your reliable ally in the world of entertainment!`,
      action1: "Schedule event",
      action2: "Add favorite event",
    },
    en: {
      title: "Your personal leisure assistant!",
      body: `Looking for the most convenient way to track events
    and ensure an exciting leisure time? LESURE is
    your reliable ally in the world of entertainment!`,
      action1: "Schedule event",
      action2: "Add favorite event",
    },
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        background: theme.palette.background.default,
      }}
    >
      <Card sx={{ background: theme.palette.background.default }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={cardContentStyle}>
              <Container>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="primary"
                  >
                    {content[language].title}
                  </Typography>
                  <Typography variant="body2" color="text">
                    {content[language].body}
                  </Typography>
                </CardContent>
              </Container>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                alt="car"
                image={imageUrl}
                sx={{
                  height: { sm: 300, md: "100%" },
                  width: { sm: 400, md: "100%" },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Card>
      <TabsBlock theme={theme} language={language} />
    </Container>
  );
}
