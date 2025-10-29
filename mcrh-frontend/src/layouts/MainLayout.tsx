import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

/**
 * MainLayout Component
 * Single Responsibility: Provide consistent layout structure for all pages
 * Includes header with search, main content area, and footer
 * 
 * Features:
 * - Full-width responsive layout (no max-width constraint)
 * - Fluid responsive padding using CSS clamp() for smooth transitions:
 *   - Mobile (xs, <600px): 16px fixed
 *   - Tablet (sm, 600-899px): 32px fixed
 *   - Desktop+ (md, 900px+): Scales smoothly from ~48px to ~192px
 * - Uses clamp(3rem, 1rem + 3vw, 12rem) for gradual viewport-based scaling
 * - No jarring jumps between breakpoints - smooth gradual increase
 * - Sticky header with search functionality
 * - Centered footer with copyright
 * 
 * Design Note: clamp() provides fluid scaling between min and max values
 * - Min: 3rem (48px) for smaller desktops (~1200px)
 * - Preferred: 1rem + 3vw (scales with viewport width)
 * - Max: 12rem (192px) for ultrawide monitors (~2560px+)
 * Result: Smooth, gradual padding increase as screen width grows
 * 
 * This layout wraps all pages via React Router's Outlet
 * Provides app-wide navigation and branding
 */

export const MainLayout = () => {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        // Navigate to home with search query
        // In a real app, this would update URLw, params
        navigate('/', { state: { searchQuery: query } });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar position="static" elevation={1}>
                <Toolbar sx={{ gap: 2 }}>
                    {/* Logo - Desktop */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexShrink: 0,
                            cursor: 'pointer',
                            display: { xs: 'none', sm: 'block' },
                            fontFamily: '"Press Start 2P", "Courier New", monospace',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            }
                        }}
                        onClick={() => navigate('/')}
                    >
                        MCRH
                    </Typography>
                    
                    {/* Logo - Mobile */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexShrink: 0,
                            cursor: 'pointer',
                            display: { xs: 'block', sm: 'none' },
                            fontFamily: '"Press Start 2P", "Courier New", monospace',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            }
                        }}
                        onClick={() => navigate('/')}
                    >
                        MCRH
                    </Typography>
                    
                    {/* Spacer to push search to the right */}
                    <Box sx={{ flexGrow: 1 }} />
                    
                    {/* Search bar on the right */}
                    <Box sx={{ maxWidth: 600, width: { xs: '100%', sm: 'auto' }, flexGrow: { xs: 0, sm: 1 } }}>
                        <SearchBar onChange={handleSearch} placeholder="Search packs..." />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container 
                component="main" 
                maxWidth={false}
                sx={{ 
                    flexGrow: 1, 
                    py: 4,
                    // Fluid responsive padding using clamp() for smooth scaling
                    // Scales smoothly from 48px (at 1200px viewport) to 192px (at 2560px viewport)
                    px: { 
                        xs: 2,   // 16px - mobile
                        sm: 4,   // 32px - tablet
                        md: 'clamp(3rem, 1rem + 3vw, 12rem)'  // Fluid from ~48px to ~192px
                    }
                }}
            >
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
