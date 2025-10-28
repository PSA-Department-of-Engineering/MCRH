import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { MinecraftVersion } from '../core/resourcePacks/models/ResourcePack';

/**
 * FilterPanel Component
 * Single Responsibility: Display and manage filter controls for resource packs
 * Currently supports Minecraft version filtering, extensible for mods/modpacks
 * 
 * @param minecraftVersions - Available Minecraft versions for filtering
 * @param selectedVersionIds - Currently selected version IDs
 * @param onVersionsChange - Callback fired when version selection changes
 */

interface FilterPanelProps {
    minecraftVersions: MinecraftVersion[];
    selectedVersionIds: string[];
    onVersionsChange: (versionIds: string[]) => void;
}

export const FilterPanel = ({
    minecraftVersions,
    selectedVersionIds,
    onVersionsChange,
}: FilterPanelProps) => {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        onVersionsChange(typeof value === 'string' ? value.split(',') : value);
    };

    const getSelectedVersionNames = () => {
        return minecraftVersions
            .filter(v => selectedVersionIds.includes(v.id))
            .map(v => v.version);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>
            
            <FormControl fullWidth size="small">
                <InputLabel id="minecraft-version-filter-label">Minecraft Versions</InputLabel>
                <Select
                    labelId="minecraft-version-filter-label"
                    id="minecraft-version-filter"
                    multiple
                    value={selectedVersionIds}
                    onChange={handleChange}
                    input={<OutlinedInput label="Minecraft Versions" />}
                    renderValue={() => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {getSelectedVersionNames().map((name) => (
                                <Chip key={name} label={name} size="small" />
                            ))}
                        </Box>
                    )}
                >
                    {minecraftVersions.map((version) => (
                        <MenuItem key={version.id} value={version.id}>
                            {version.version}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
