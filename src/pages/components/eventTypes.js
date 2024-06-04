import {
    OilBarrelOutlined, 
    FilterAltOutlined, 
    BuildOutlined
} from '@mui/icons-material';

export const eventTypes = [
    {
        type: 'SPORTS',
        name: {uk:'SPORTS', en:'SPORTS'},
        icon: <OilBarrelOutlined />,
        color: '#FF5733',
    },
    {
        type: 'CONCERT',
        name: {uk:'CONCERT', en: 'CONCERT'},
        icon: <FilterAltOutlined />,
        color: '#33FF57',
    },
    {
        type: 'THEATER',
        name: {uk:'THEATER', en: 'THEATER'},
        icon: <BuildOutlined />,
        color: '#5733FF',
    }
];
