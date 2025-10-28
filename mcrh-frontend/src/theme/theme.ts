import { createTheme } from '@mui/material/styles';

// MCRH theme configuration
export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2e7d32', // Minecraft-inspired green
            light: '#60ad5e',
            dark: '#005005',
            contrastText: '#fff',
        },
        secondary: {
            main: '#8d6e63', // Earthy brown
            light: '#be9c91',
            dark: '#5f4339',
            contrastText: '#fff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Disable uppercase
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});
