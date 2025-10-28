/**
 * ViewToggle Component
 * Single Responsibility: Toggle between grid and table view modes
 * Pure presentational component - no business logic
 * 
 * @param view - Current active view mode ('grid' or 'table')
 * @param onViewChange - Callback fired when view mode changes
 */

import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

export type ViewMode = 'grid' | 'table';

interface ViewToggleProps {
    view: ViewMode;
    onViewChange: (view: ViewMode) => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newView: ViewMode | null) => {
        if (newView !== null) {
            onViewChange(newView);
        }
    };

    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleChange}
            aria-label="view mode"
            size="small"
        >
            <ToggleButton value="grid" aria-label="grid view">
                <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="table" aria-label="table view">
                <ViewListIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
