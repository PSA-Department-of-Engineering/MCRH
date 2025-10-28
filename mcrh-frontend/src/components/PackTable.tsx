/**
 * PackTable Component
 * Single Responsibility: Display resource packs in a sortable table format
 * Pure presentational component - no business logic
 * Responsive: Converts to card-like layout on mobile to avoid horizontal scrolling
 * 
 * @param packs - Array of resource packs to display
 * @param loading - Whether the table is in loading state
 * @param sortBy - Current sort field
 * @param sortDirection - Current sort direction ('asc' or 'desc')
 * @param onSortChange - Callback when sort column is clicked
 * @param onPackClick - Optional callback when a pack row is clicked
 * @param onDownload - Callback when download button is clicked
 */

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Box,
    Typography,
    TableSortLabel,
    CircularProgress,
    Card,
    CardContent,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import type { ResourcePack, SortOption } from '../core/resourcePacks/models/ResourcePack';
import { formatFileSize, formatNumber } from '../utils/format';

interface PackTableProps {
    packs: ResourcePack[];
    loading?: boolean;
    sortBy: SortOption;
    sortDirection: 'asc' | 'desc';
    onSortChange: (field: SortOption) => void;
    onPackClick?: (pack: ResourcePack) => void;
    onDownload: (pack: ResourcePack) => void;
}

export const PackTable = ({
    packs,
    loading = false,
    sortBy,
    sortDirection,
    onSortChange,
    onPackClick,
    onDownload,
}: PackTableProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

    // Mobile card layout
    if (isMobile) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {packs.map((pack) => (
                    <Card
                        key={pack.id}
                        sx={{
                            cursor: onPackClick ? 'pointer' : 'default',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': onPackClick
                                ? {
                                      transform: 'translateY(-2px)',
                                      boxShadow: 4,
                                  }
                                : {},
                        }}
                        onClick={() => onPackClick?.(pack)}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {pack.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        by {pack.author}
                                    </Typography>
                                </Box>
                                <IconButton
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDownload(pack);
                                    }}
                                    aria-label={`Download ${pack.name}`}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </Box>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                                {pack.minecraftVersions.slice(0, 2).map((version) => (
                                    <Chip key={version.id} label={version.version} size="small" />
                                ))}
                                {pack.minecraftVersions.length > 2 && (
                                    <Chip label={`+${pack.minecraftVersions.length - 2}`} size="small" variant="outlined" />
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    {formatFileSize(pack.fileSize)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {formatNumber(pack.downloadCount)} downloads
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    }

    // Desktop table layout
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="resource packs table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'name'}
                                direction={sortBy === 'name' ? sortDirection : 'asc'}
                                onClick={() => onSortChange('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Versions</TableCell>
                        <TableCell align="right">Size</TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={sortBy === 'downloadCount'}
                                direction={sortBy === 'downloadCount' ? sortDirection : 'desc'}
                                onClick={() => onSortChange('downloadCount')}
                            >
                                Downloads
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((pack) => (
                        <TableRow
                            key={pack.id}
                            hover
                            onClick={() => onPackClick?.(pack)}
                            sx={{
                                cursor: onPackClick ? 'pointer' : 'default',
                                '&:last-child td, &:last-child th': { border: 0 },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography variant="body2" fontWeight="medium">
                                    {pack.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color="text.secondary">
                                    {pack.author}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 250 }}>
                                    {pack.minecraftVersions.slice(0, 3).map((version) => (
                                        <Chip key={version.id} label={version.version} size="small" />
                                    ))}
                                    {pack.minecraftVersions.length > 3 && (
                                        <Chip
                                            label={`+${pack.minecraftVersions.length - 3}`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body2">{formatFileSize(pack.fileSize)}</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body2">{formatNumber(pack.downloadCount)}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDownload(pack);
                                    }}
                                    aria-label={`Download ${pack.name}`}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
