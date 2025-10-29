import { Box, Typography, CircularProgress } from '@mui/material';
import { PackCard } from './PackCard';
import { InfiniteScrollTrigger } from './InfiniteScrollTrigger';
import type { ResourcePack } from '../core/resourcePacks/models/ResourcePack';

/**
 * PackGrid Component
 * Single Responsibility: Layout and display a grid of resource pack cards
 * Handles responsive layout, empty states, and infinite scrolling
 * 
 * Responsive layout strategy:
 * - Uses CSS Grid auto-fit with minmax for optimal card sizing
 * - Cards maintain minimum 220px width (narrow, portrait-oriented)
 * - Automatically fits as many cards as possible per row
 * - Gap spacing between cards: 24px → 32px → 40px → 48px
 * - Large page margins (3x) for breathing room from edges
 * - Mobile uses single column for better UX
 * 
 * Benefits:
 * - Narrow cards create elegant portrait layout
 * - More cards fit per row on wider screens
 * - Generous page margins frame the content nicely
 * - No manual breakpoints needed - CSS handles it automatically
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
                    // Auto-fit cards with minimum 220px width - much narrower, portrait-oriented cards
                    gridTemplateColumns: {
                        xs: '1fr',  // Mobile: always 1 column for better UX
                        sm: 'repeat(auto-fit, minmax(220px, 1fr))',  // Tablet+: narrow cards, more per row
                    },
                    gap: { xs: 3, sm: 4, md: 5, lg: 6 },  // Same gap between cards: 24px → 32px → 40px → 48px
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
