import React from "react";
import TabPanel from "./TabPanel";
import { Container, Grid, Card, Tabs, Tab } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import NotificationsIcon from "@mui/icons-material/Notifications";
import imageLargeDatabase from "../image/largeDatabase.jpg";
import imageServiceHistory from "../image/serviceHistory.jpg";


const TabsBlock = ({ theme, language }) => {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  const containerStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    maxWidth: "100%",
  };

  var images = [
    imageLargeDatabase,
    imageServiceHistory

  ];
  // Визначаємо значення backgroundImage на основі значення змінної value
  containerStyle.backgroundImage = `linear-gradient(to bottom, ${theme.palette.background.default}, transparent), url(${images[value]})`;
  var icons = [

    <LibraryBooksIcon />,
    <NotificationsIcon />,
  ];

  const content = {
    uk: {
      title: [
        "Extensive Event Database",
        "Subscription History"
      ],
      body: [
        `We have access to a wide range of information about events
       of various types and genres, which allows us to provide you with complete
       information about available activities. You can access full and
       detailed information about events, be it modern concerts,
       sports competitions, or classical performances.`,
        `You can track your subscription history,
       scheduled events, and recommendations for upcoming activities. This feature allows you to manage your leisure time effectively,
       keep accurate records of attended events, and ensure timely information about exciting events throughout
       the year.`

      ],
      action: [
        "Find an Event",
        "View Recommendations"

      ],
    },
    en: {
      title: [
        "Extensive Event Database",
        "Subscription History"
      ],
      body: [
        `We have access to a wide range of information about events
       of various types and genres, which allows us to provide you with complete
       information about available activities. You can access full and
       detailed information about events, be it modern concerts,
       sports competitions, or classical performances.`,
        `You can track your subscription history,
       scheduled events, and recommendations for upcoming activities. This feature allows you to manage your leisure time effectively,
       keep accurate records of attended events, and ensure timely information about exciting events throughout
       the year.`

      ],
      action: [
        "Find an Event",
        "View Recommendations"

      ],
    },
  };

  return (
    <Card
      sx={{
        background: theme.palette.background.default,
        marginTop: 2,
        padding: 0,
      }}
    >
      <Container style={containerStyle}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs"
            centered
          >
            {icons.map((icon, index) => (
              <Tab
                key={index}
                icon={icon}
                iconPosition="start"
                label={content[language].title[index]}
                sx={{ fontSize: { xs: 0, sm: 0, md: 12, lg: 18 }, color: theme.palette.secondary.main }}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        {content[language].title.map((title, index) => (
          <TabPanel
            key={index}
            value={value}
            index={index}
            title={title}
            body={content[language].body[index]}
          />
        ))}
      </Container>
    </Card>
  );
};

export default TabsBlock;
