import { Box, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { PackGrid } from '../components/PackGrid';
import { PackTable } from '../components/PackTable';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { ViewToggle, type ViewMode } from '../components/ViewToggle';
import { useResourcePacks, useMinecraftVersions } from '../core/resourcePacks/hooks/useResourcePacks';
import type { SortOption } from '../core/resourcePacks/models/ResourcePack';

/**
 * HomePage Component
 * Orchestrates the main browsing experience:
 * - Search functionality
 * - Filtering by Minecraft version
 * - Toggle between grid and table views
 * - Sortable table display
 * 
 * This is the main landing page of the application
 * Wires together domain hooks with UI components
 */

export const HomePage = () => {
    const minecraftVersions = useMinecraftVersions();
    const { packs, filters, sort, loading, updateFilters, updateSort } = useResourcePacks();
    const [view, setView] = useState<ViewMode>('grid');

    const handleSearchChange = (query: string) => {
        updateFilters({ searchQuery: query });
    };

    const handleVersionsChange = (versionIds: string[]) => {
        updateFilters({ minecraftVersionIds: versionIds });
    };

    const handlePackClick = (pack: any) => {
        // TODO: Navigate to pack detail page in future ticket
        console.log('Clicked pack:', pack.name);
    };

    const handleSortChange = (field: SortOption) => {
        // Toggle direction if clicking same column, otherwise default to asc
        const newDirection =
            sort.sortBy === field && sort.direction === 'asc' ? 'desc' : 'asc';
        updateSort({ sortBy: field, direction: newDirection });
    };

    const handleDownload = (pack: any) => {
        // TODO: Implement actual download in future ticket
        console.log('Downloading pack:', pack.name);
        window.open(pack.downloadUrl, '_blank');
    };

    return (
        <Box>
            {/* Page header with view toggle */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Browse Resource Packs
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Discover and download Minecraft resource packs for your game
                    </Typography>
                </Box>
                <ViewToggle view={view} onViewChange={setView} />
            </Box>

            {/* Search bar */}
            <Box sx={{ mb: 3 }}>
                <SearchBar
                    value={filters.searchQuery || ''}
                    onChange={handleSearchChange}
                />
            </Box>

            {/* Main content area with filters and grid */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Filters sidebar */}
                <Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
                    <Paper sx={{ p: 2, position: { md: 'sticky' }, top: { md: 16 } }}>
                        <FilterPanel
                            minecraftVersions={minecraftVersions}
                            selectedVersionIds={filters.minecraftVersionIds || []}
                            onVersionsChange={handleVersionsChange}
                        />
                    </Paper>
                </Box>

                {/* Pack grid */}
                <Box sx={{ flexGrow: 1 }}>
                    {view === 'grid' ? (
                        <PackGrid
                            packs={packs}
                            loading={loading}
                            onPackClick={handlePackClick}
                        />
                    ) : (
                        <PackTable
                            packs={packs}
                            loading={loading}
                            sortBy={sort.sortBy}
                            sortDirection={sort.direction}
                            onSortChange={handleSortChange}
                            onPackClick={handlePackClick}
                            onDownload={handleDownload}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};
