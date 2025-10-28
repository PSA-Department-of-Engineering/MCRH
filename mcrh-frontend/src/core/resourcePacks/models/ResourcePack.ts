/**
 * Domain Models for Resource Pack Management
 * These are pure domain entities with no framework dependencies
 */

/**
 * Minecraft version entity
 * @property id - Unique identifier for the version
 * @property version - Version string (e.g., "1.21.1", "1.20.4")
 * @property releaseDate - Optional release date of this version
 */
export interface MinecraftVersion {
    id: string;
    version: string;
    releaseDate?: Date;
}

/**
 * Mod entity
 * @property id - Unique identifier for the mod
 * @property name - Display name of the mod
 * @property version - Version of the mod
 */
export interface Mod {
    id: string;
    name: string;
    version: string;
}

/**
 * Modpack entity
 * @property id - Unique identifier for the modpack
 * @property name - Display name of the modpack
 * @property version - Version of the modpack
 */
export interface Modpack {
    id: string;
    name: string;
    version: string;
}

/**
 * Resource Pack entity - Core domain model
 * @property id - Unique identifier
 * @property name - Display name of the pack
 * @property description - Full description of the pack
 * @property author - Creator of the pack
 * @property tags - Searchable tags
 * @property thumbnailUrl - Preview image URL
 * @property downloadUrl - Direct download link
 * @property fileSize - File size in bytes
 * @property uploadDate - Initial upload timestamp
 * @property lastModified - Last update timestamp
 * @property minecraftVersions - Compatible Minecraft versions
 * @property supportedMods - Compatible mods
 * @property supportedModpacks - Compatible modpacks
 * @property downloadCount - Total download counter
 * @property isArchived - Whether the pack is archived/deprecated
 */
export interface ResourcePack {
    id: string;
    name: string;
    description: string;
    author: string;
    tags: string[];
    thumbnailUrl?: string;
    downloadUrl: string;
    fileSize: number;
    uploadDate: Date;
    lastModified: Date;
    
    // Compatibility metadata
    minecraftVersions: MinecraftVersion[];
    supportedMods: Mod[];
    supportedModpacks: Modpack[];
    
    // Stats
    downloadCount: number;
    isArchived: boolean;
}

/**
 * Filter criteria for resource pack search
 * @property searchQuery - Text search across name, description, author
 * @property minecraftVersionIds - Filter by compatible Minecraft versions
 * @property modIds - Filter by compatible mods
 * @property modpackIds - Filter by compatible modpacks
 * @property tags - Filter by tags
 */
export interface ResourcePackFilters {
    searchQuery?: string;
    minecraftVersionIds?: string[];
    modIds?: string[];
    modpackIds?: string[];
    tags?: string[];
}

/**
 * Sort options for resource pack list
 * - name: Alphabetical by pack name
 * - uploadDate: Newest first
 * - downloadCount: Most popular first
 */
export type SortOption = 'name' | 'uploadDate' | 'downloadCount';
export type SortDirection = 'asc' | 'desc';

export interface ResourcePackSort {
    sortBy: SortOption;
    direction: SortDirection;
}
