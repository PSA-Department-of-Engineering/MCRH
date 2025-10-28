import { Box, Typography, CircularProgress } from '@mui/material';
import { PackCard } from './PackCard';
import type { ResourcePack } from '../core/resourcePacks/models/ResourcePack';

/**
 * PackGrid Component
 * Single Responsibility: Layout and display a grid of resource pack cards
 * Handles responsive layout and empty states
 * 
 * @param packs - Array of resource packs to display
 * @param loading - Whether the grid is in loading state
 * @param onPackClick - Optional callback when a pack card is clicked
 */

interface PackGridProps {
    packs: ResourcePack[];
    loading?: boolean;
    onPackClick?: (pack: ResourcePack) => void;
}

export const PackGrid = ({ packs, loading = false, onPackClick }: PackGridProps) => {
    // Loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Empty state
    if (packs.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 400,
                    textAlign: 'center',
                    gap: 2,
                }}
            >
                <Typography variant="h5" color="text.secondary">
                    No resource packs found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or search query
                </Typography>
            </Box>
        );
    }

    // Grid of packs
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
                gap: 3,
            }}
        >
            {packs.map((pack) => (
                <PackCard key={pack.id} pack={pack} onClick={onPackClick} />
            ))}
        </Box>
    );
};
