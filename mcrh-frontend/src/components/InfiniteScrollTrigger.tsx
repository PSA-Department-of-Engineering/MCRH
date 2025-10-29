/**
 * InfiniteScrollTrigger Component
 * Single Responsibility: Detect when user scrolls near bottom and trigger callback
 * Uses Intersection Observer API for efficient scroll detection
 * Pure presentational component - no business logic
 * 
 * @param onIntersect - Callback fired when trigger element becomes visible
 * @param isLoading - Whether more data is currently being loaded
 * @param hasMore - Whether there is more data to load
 * @param rootMargin - Distance from viewport edge to trigger (default: "200px")
 */

import { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface InfiniteScrollTriggerProps {
    onIntersect: () => void;
    isLoading: boolean;
    hasMore: boolean;
    rootMargin?: string;
}

export const InfiniteScrollTrigger = ({
    onIntersect,
    isLoading,
    hasMore,
    rootMargin = '200px',
}: InfiniteScrollTriggerProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        // Create Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                // Trigger callback when element becomes visible and not currently loading
                if (firstEntry.isIntersecting && hasMore && !isLoading) {
                    onIntersect();
                }
            },
            {
                root: null, // viewport
                rootMargin, // trigger 200px before reaching element
                threshold: 0.1, // 10% of element must be visible
            }
        );

        observer.observe(trigger);

        return () => {
            observer.disconnect();
        };
    }, [onIntersect, isLoading, hasMore, rootMargin]);

    // Don't render if no more data
    if (!hasMore && !isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    No more results
                </Typography>
            </Box>
        );
    }

    // Loading indicator
    if (isLoading) {
        return (
            <Box
                ref={triggerRef}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4,
                }}
            >
                <CircularProgress size={32} />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    Loading more...
                </Typography>
            </Box>
        );
    }

    // Invisible trigger element
    return (
        <Box
            ref={triggerRef}
            sx={{
                height: 1,
                width: '100%',
            }}
        />
    );
};
