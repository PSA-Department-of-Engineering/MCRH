import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

/**
 * MainLayout Component
 * Single Responsibility: Provide consistent layout structure for all pages
 * Includes header with search, main content area, and footer
 * 
 * This layout wraps all pages via React Router's Outlet
 * Provides app-wide navigation and branding
 */

export const MainLayout = () => {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        // Navigate to home with search query
        // In a real app, this would update URL params
        navigate('/', { state: { searchQuery: query } });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar position="static" elevation={1}>
                <Toolbar sx={{ gap: 2 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexShrink: 0,
                            cursor: 'pointer',
                            display: { xs: 'none', sm: 'block' }
                        }}
                        onClick={() => navigate('/')}
                    >
                        MCRH
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexShrink: 0,
                            cursor: 'pointer',
                            display: { xs: 'block', sm: 'none' }
                        }}
                        onClick={() => navigate('/')}
                    >
                        MCRH
                    </Typography>
                    
                    {/* Search bar in header */}
                    <Box sx={{ flexGrow: 1, maxWidth: 600 }}>
                        <SearchBar onChange={handleSearch} placeholder="Search packs..." />
                    </Box>
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
