import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar position="static" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MCRH - Minecraft Resource Pack Hub
                    </Typography>
                    {/* Navigation will be added in MCRH-15 */}
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Container>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        MCRH © {new Date().getFullYear()}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};
