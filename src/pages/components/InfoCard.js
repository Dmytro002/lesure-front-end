import React from 'react'
import {
    Card,
    CardContent,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';

import {useNavigate} from "react-router-dom";

export const getPropertyValue = (data, path, default_value = '') => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => {
        if (!acc) return default_value;

        if (key.includes('[')) {
            const [prop, index] = key.split('[').map(item => item.replace(']', ''));
            if (!acc[prop] || !acc[prop][index]) return default_value;
            acc = acc[prop][index];
        } else {
            if (!acc[key]) return default_value;
            acc = acc[key];
        }

        return acc;
    }, data);
};

const InfoCard = ({theme, language, title, icons, configuration, properties, json, type}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const content = {
        uk: {
            shedule: 'Запланувати івент',
            more: 'Більше...',
            history: 'Історія івенту',
            delete: 'Видалити',
            none: 'Немає',
        },
        en: {
            shedule: 'Schedule event',
            more: 'More...',
            history: 'event history',
            delete: 'Delete',
            none: 'None',
        },
    }

    return (
        <Card sx={{background: theme.palette.background.default, margin: 5}}>

            <CardContent>
                {title &&
                    <Container disableGutters sx={{
                        display: 'flex',
                        justifyContent: type === 'control' ? 'space-between' : 'flex-start'
                    }}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            color="text"
                        >
                            {title}
                        </Typography>
                        {type === 'control' &&
                            <>
                            </>
                        }
                    </Container>
                }
                <List sx={{marginLeft: '40px'}}>
                    <Grid container spacing={0}>
                        {icons.map((icon, index) => (
                            <Grid item xs={12} sm={6}>
                                <ListItem key={index}>
                                    <ListItemIcon sx={{color: theme.palette.secondary.main}}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={getPropertyValue(json, properties[index], content[language].none).toString().toLowerCase()}
                                        secondary={configuration[index]}
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
        </Card>
    )
}

export default InfoCard
