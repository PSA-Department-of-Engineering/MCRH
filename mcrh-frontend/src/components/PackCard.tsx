import { Card, CardContent, CardMedia, Typography, Chip, Box, CardActionArea } from '@mui/material';
import type { ResourcePack } from '../core/resourcePacks/models/ResourcePack';
import { formatFileSize } from '../utils/format';

/**
 * PackCard Component
 * Single Responsibility: Display a single resource pack card with thumbnail, metadata, and compatibility info
 * Pure presentational component - no business logic
 * 
 * @param pack - Resource pack to display
 * @param onClick - Optional callback when card is clicked
 */

interface PackCardProps {
    pack: ResourcePack;
    onClick?: (pack: ResourcePack) => void;
}

export const PackCard = ({ pack, onClick }: PackCardProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick(pack);
        }
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                },
            }}
        >
            <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={pack.thumbnailUrl}
                    alt={pack.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {/* Pack name and author */}
                    <Box>
                        <Typography variant="h6" component="h3" gutterBottom noWrap>
                            {pack.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            by {pack.author}
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '40px',
                        }}
                    >
                        {pack.description}
                    </Typography>

                    {/* Minecraft versions */}
                    <Box sx={{ mt: 'auto' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Minecraft Versions:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {pack.minecraftVersions.slice(0, 3).map((version) => (
                                <Chip
                                    key={version.id}
                                    label={version.version}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                            {pack.minecraftVersions.length > 3 && (
                                <Chip
                                    label={`+${pack.minecraftVersions.length - 3} more`}
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        </Box>
                    </Box>

                    {/* File size and download count */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            {formatFileSize(pack.fileSize)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {pack.downloadCount.toLocaleString()} downloads
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
