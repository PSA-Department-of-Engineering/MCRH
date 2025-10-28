import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';

/**
 * SearchBar Component
 * Single Responsibility: Capture and emit search query input
 * Includes debouncing for performance
 * 
 * @param value - Current search query value
 * @param onChange - Callback fired when search query changes (after debounce)
 * @param placeholder - Placeholder text for the input field
 * @param debounceMs - Debounce delay in milliseconds (default: 300)
 */

interface SearchBarProps {
    value?: string;
    onChange: (query: string) => void;
    placeholder?: string;
    debounceMs?: number;
}

export const SearchBar = ({
    value = '',
    onChange,
    placeholder = 'Search resource packs...',
    debounceMs = 300,
}: SearchBarProps) => {
    const [localValue, setLocalValue] = useState(value);

    // Sync with external value changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Debounced onChange
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                onChange(localValue);
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, debounceMs, onChange, value]);

    return (
        <TextField
            fullWidth
            size="small"
            placeholder={placeholder}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                backgroundColor: 'background.paper',
                borderRadius: 1,
            }}
        />
    );
};
