import { eventTypes } from '../../components/eventTypes';
import {
    Button,
    Box,
    IconButton,
    FormControl,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Close } from '@mui/icons-material';
import en from 'dayjs/locale/en-gb';
import uk from 'dayjs/locale/uk';
import { styled } from '@mui/material/styles';
import { getUserId, request, setAuthHeader } from '../../../helpers/axios_helper';

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiInputBase-input': {
        color: theme.palette.text.main,
    },
    '& fieldset': {
        borderColor: theme.palette.secondary.main,
    },
    '& .MuiSelect-icon': {
        color: theme.palette.secondary.main,
    },
}));

const content = {
    uk: {
        addEvent: 'Add event',
        editEvent: 'Edit event',
        event: 'Event Type',
        price: 'Price',
        name: 'Name',
        location: 'Location',
        date: 'Date',
        desk: 'Description',
        save: 'Save',
    },
    en: {
        addEvent: 'Add event',
        editEvent: 'Edit event',
        event: 'Event Type',
        price: 'Price',
        name: 'Name',
        location: 'Location',
        date: 'Date',
        desk: 'Description',
        save: 'Save',
    }
};

function addEvent(event) {
    request(
        "POST",
        "/event",
        {
            type: event.type,
            description: event.description,
            price: event.price,
            name: event.name,
            location: event.location,
            date: event.date,
            imageUrl: event.imageUrl
        }).then(
        (response) => {
            console.log(response);
        }).catch(
        (error) => {
            console.log(error);
        }
    );
}

function changeEvent(idEvent, event) {
    request(
        "PUT",
        `/event/${idEvent}`,
        {
            id: event.id,
            price: event.price,
            name: event.name,
            description: event.description,
            location: event.location,
            date: event.date,
            eventType: event.type,
            imageUrl: event.imageUrl,comments: event.comments,
            reactionResponse: event.reactionResponse

        }).then(
        (response) => {
            console.log(response);
        }).catch(
        (error) => {
            console.log(error);
        }
    );
}

const EventDialog = ({ theme, language, open, isNew, handleClickClose, id, type, price, name, location, date, desk, imageUrl, setId, setType, setPrice, setName, setLocation, setDate, setDesk, setImageUrl }) => {

    const handleButtonClick = () => {
        const eventData = {
            id: id,
            type: type,
            description: desk,
            price: price,
            name: name,
            location: location,
            date: date,
            imageUrl: imageUrl
        };

        !isNew ? changeEvent(eventData.id, eventData) : addEvent(eventData);
        handleClickClose();
    };

    return (
        <Dialog
            onClose={handleClickClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{
                '& .MuiDialogContent-root': {
                    padding: theme.spacing(2),
                },
                '& .MuiDialogActions-root': {
                    padding: theme.spacing(1),
                },
                '& .MuiPaper-root': {
                    backgroundColor: theme.palette.background.default,
                    width: '480px',
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {!isNew ? content[language].editEvent : content[language].addEvent}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClickClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>
            <DialogContent dividers>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ color: theme.palette.secondary.main }}>
                            {content[language].event}
                        </InputLabel>
                        <StyledSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label={content[language].event}
                            onChange={(event) => setType(event.target.value)}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: theme.palette.background.default,
                                    }
                                }
                            }}
                        >
                            {eventTypes.map(eventType => (
                                <MenuItem key={eventType.type} value={eventType.type}>{eventType.icon}{'    '}{eventType.name[language]}</MenuItem>
                            ))}
                        </StyledSelect>
                    </FormControl>
                </Box>
                <TextField
                    label={content[language].name}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    label={content[language].price}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    label={content[language].location}
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <Box sx={{ marginTop: 1, width: '100%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language === 'uk' ? uk : en}>
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label={content[language].date} value={date} onChange={(newValue) => setDate(newValue)}
                                        sx={{
                                            width: '100%',
                                            '& fieldset': {
                                                borderColor: theme.palette.secondary.main,
                                            },
                                            '& .MuiSvgIcon-root ': {
                                                color: theme.palette.secondary.main,
                                            },
                                            "label": {
                                                color: theme.palette.secondary.main
                                            }
                                        }}
                                        slotProps={{
                                            layout: {
                                                sx: {
                                                    '.MuiDateCalendar-root': {
                                                        color: theme.palette.text.primary,
                                                        backgroundColor: theme.palette.background.default,
                                                    },
                                                    "& .MuiIconButton-root": {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                    '& .MuiTypography-root': {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                    "& .css-1eyvkhb-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
                                                        borderColor: theme.palette.secondary.main,
                                                    },
                                                }
                                            }
                                        }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <TextField
                    label={content[language].desk}
                    multiline
                    value={desk}
                    onChange={(event) => setDesk(event.target.value)}
                    rows={4}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    label="Image URL"
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleButtonClick}>
                    {content[language].save}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventDialog;
