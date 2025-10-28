import { Box, Typography, Paper } from '@mui/material';
import { PackGrid } from '../components/PackGrid';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { useResourcePacks, useMinecraftVersions } from '../core/resourcePacks/hooks/useResourcePacks';

/**
 * HomePage Component
 * Orchestrates the main browsing experience:
 * - Search functionality
 * - Filtering by Minecraft version
 * - Grid display of resource packs
 * 
 * This is the main landing page of the application
 * Wires together domain hooks with UI components
 */

export const HomePage = () => {
    const minecraftVersions = useMinecraftVersions();
    const { packs, filters, loading, updateFilters } = useResourcePacks();

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

    return (
        <Box>
            {/* Page header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Browse Resource Packs
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Discover and download Minecraft resource packs for your game
                </Typography>
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
                    <PackGrid
                        packs={packs}
                        loading={loading}
                        onPackClick={handlePackClick}
                    />
                </Box>
            </Box>
        </Box>
    );
};
