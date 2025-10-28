import { Box, Typography } from '@mui/material';

export const HomePage = () => {
    return (
        <Box>
            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to MCRH
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Minecraft Resource Pack Hub - Browse, search, and download resource packs
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Frontend skeleton setup complete. Components will be added in MCRH-15.
            </Typography>
        </Box>
    );
};
