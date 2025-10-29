/**
 * Data Transfer Objects (DTOs) for Resource Pack API
 * These types represent the API response structure from the backend
 * Separate from domain models to allow backend flexibility
 */

/**
 * Minecraft Version DTO
 * API response structure for Minecraft versions
 */
export interface MinecraftVersionDTO {
    id: string;
    version: string;
    releaseDate?: string; // ISO 8601 date string from API
}

/**
 * Mod DTO
 * API response structure for mods
 */
export interface ModDTO {
    id: string;
    name: string;
    version: string;
}

/**
 * Modpack DTO
 * API response structure for modpacks
 */
export interface ModpackDTO {
    id: string;
    name: string;
    version: string;
}

/**
 * Resource Pack DTO
 * API response structure for resource packs
 * May have different field names or structure than domain model
 */
export interface ResourcePackDTO {
    id: string;
    name: string;
    description: string;
    author: string;
    tags: string[];
    thumbnailUrl?: string;
    downloadUrl: string;
    fileSize: number;
    uploadDate: string; // ISO 8601 date string from API
    lastModified: string; // ISO 8601 date string from API
    minecraftVersions: MinecraftVersionDTO[];
    supportedMods: ModDTO[];
    supportedModpacks: ModpackDTO[];
    downloadCount: number;
    isArchived: boolean;
}

/**
 * Resource Pack List Response DTO
 * API response for fetching multiple resource packs
 */
export interface ResourcePackListResponseDTO {
    packs: ResourcePackDTO[];
    total: number;
    page?: number;
    pageSize?: number;
}

/**
 * Minecraft Versions List Response DTO
 * API response for fetching Minecraft versions
 */
export interface MinecraftVersionsResponseDTO {
    versions: MinecraftVersionDTO[];
}
