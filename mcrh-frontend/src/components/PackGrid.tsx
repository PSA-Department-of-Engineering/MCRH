import { Box, Typography, CircularProgress } from '@mui/material';
import { PackCard } from './PackCard';
import { InfiniteScrollTrigger } from './InfiniteScrollTrigger';
import type { ResourcePack } from '../core/resourcePacks/models/ResourcePack';

/**
 * PackGrid Component
 * Single Responsibility: Layout and display a grid of resource pack cards
 * Handles responsive layout, empty states, and infinite scrolling
 * 
 * @param packs - Array of resource packs to display
 * @param loading - Whether the initial grid is in loading state
 * @param loadingMore - Whether more packs are being loaded
 * @param hasMore - Whether there are more packs to load
 * @param onPackClick - Optional callback when a pack card is clicked
 * @param onLoadMore - Callback to load more packs
 */

interface PackGridProps {
    packs: ResourcePack[];
    loading?: boolean;
    loadingMore?: boolean;
    hasMore?: boolean;
    onPackClick?: (pack: ResourcePack) => void;
    onLoadMore?: () => void;
}

export const PackGrid = ({ 
    packs, 
    loading = false, 
    loadingMore = false,
    hasMore = false,
    onPackClick,
    onLoadMore,
}: PackGridProps) => {
    // Initial loading state
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

    // Grid of packs with infinite scroll
    return (
        <Box>
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
            
            {/* Infinite scroll trigger */}
            {onLoadMore && (
                <InfiniteScrollTrigger
                    onIntersect={onLoadMore}
                    isLoading={loadingMore}
                    hasMore={hasMore}
                />
            )}
        </Box>
    );
};
