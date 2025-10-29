/**
 * DTO to Domain Model Mappers
 * Pure functions that transform API DTOs to domain models
 * Single Responsibility: Data conversion and transformation
 * 
 * This anti-corruption layer protects domain models from API changes
 */

import type {
    MinecraftVersionDTO,
    ModDTO,
    ModpackDTO,
    ResourcePackDTO,
} from './dtos';
import type {
    MinecraftVersion,
    Mod,
    Modpack,
    ResourcePack,
} from '../../core/resourcePacks/models/ResourcePack';

/**
 * Convert Minecraft Version DTO to domain model
 * @param dto - API response DTO
 * @returns Domain model
 */
export const mapMinecraftVersionFromDTO = (dto: MinecraftVersionDTO): MinecraftVersion => {
    return {
        id: dto.id,
        version: dto.version,
        releaseDate: dto.releaseDate ? new Date(dto.releaseDate) : undefined,
    };
};

/**
 * Convert Mod DTO to domain model
 * @param dto - API response DTO
 * @returns Domain model
 */
export const mapModFromDTO = (dto: ModDTO): Mod => {
    return {
        id: dto.id,
        name: dto.name,
        version: dto.version,
    };
};

/**
 * Convert Modpack DTO to domain model
 * @param dto - API response DTO
 * @returns Domain model
 */
export const mapModpackFromDTO = (dto: ModpackDTO): Modpack => {
    return {
        id: dto.id,
        name: dto.name,
        version: dto.version,
    };
};

/**
 * Convert Resource Pack DTO to domain model
 * Handles all nested transformations (versions, mods, modpacks)
 * Converts date strings to Date objects
 * 
 * @param dto - API response DTO
 * @returns Domain model
 */
export const mapResourcePackFromDTO = (dto: ResourcePackDTO): ResourcePack => {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        author: dto.author,
        tags: dto.tags,
        thumbnailUrl: dto.thumbnailUrl,
        downloadUrl: dto.downloadUrl,
        fileSize: dto.fileSize,
        uploadDate: new Date(dto.uploadDate),
        lastModified: new Date(dto.lastModified),
        minecraftVersions: dto.minecraftVersions.map(mapMinecraftVersionFromDTO),
        supportedMods: dto.supportedMods.map(mapModFromDTO),
        supportedModpacks: dto.supportedModpacks.map(mapModpackFromDTO),
        downloadCount: dto.downloadCount,
        isArchived: dto.isArchived,
    };
};

/**
 * Convert array of Resource Pack DTOs to domain models
 * @param dtos - Array of API response DTOs
 * @returns Array of domain models
 */
export const mapResourcePacksFromDTO = (dtos: ResourcePackDTO[]): ResourcePack[] => {
    return dtos.map(mapResourcePackFromDTO);
};

/**
 * Convert array of Minecraft Version DTOs to domain models
 * @param dtos - Array of API response DTOs
 * @returns Array of domain models
 */
export const mapMinecraftVersionsFromDTO = (dtos: MinecraftVersionDTO[]): MinecraftVersion[] => {
    return dtos.map(mapMinecraftVersionFromDTO);
};
