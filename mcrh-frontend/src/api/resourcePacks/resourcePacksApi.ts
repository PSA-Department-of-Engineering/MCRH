/**
 * Resource Packs API Client
 * Handles all API communication for resource pack operations
 * Anti-corruption layer between backend and domain
 * 
 * Currently uses mock data, will be replaced with real HTTP calls
 */

import { mockGet } from '../apiClient';
import { RESOURCE_PACKS_ENDPOINTS, MINECRAFT_VERSIONS_ENDPOINTS } from '../endpoints';
import type { ResourcePackDTO, MinecraftVersionDTO, ResourcePackListResponseDTO } from './dtos';
import { mockResourcePacks, mockMinecraftVersions } from '../../core/resourcePacks/services/mockData';
import type { ResourcePackFilters, ResourcePackSort } from '../../core/resourcePacks/models/ResourcePack';

/**
 * Convert domain filters to API query parameters
 * @param filters - Domain filter object
 * @returns Query string for API
 */
const buildQueryParams = (filters?: ResourcePackFilters, sort?: ResourcePackSort): string => {
    const params = new URLSearchParams();
    
    if (filters?.searchQuery) {
        params.append('search', filters.searchQuery);
    }
    
    if (filters?.minecraftVersionIds && filters.minecraftVersionIds.length > 0) {
        params.append('versions', filters.minecraftVersionIds.join(','));
    }
    
    if (filters?.modIds && filters.modIds.length > 0) {
        params.append('mods', filters.modIds.join(','));
    }
    
    if (filters?.modpackIds && filters.modpackIds.length > 0) {
        params.append('modpacks', filters.modpackIds.join(','));
    }
    
    if (filters?.tags && filters.tags.length > 0) {
        params.append('tags', filters.tags.join(','));
    }
    
    if (sort) {
        params.append('sortBy', sort.sortBy);
        params.append('direction', sort.direction);
    }
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
};

/**
 * Convert mock data to DTOs (simulating API response structure)
 * In real implementation, this won't be needed
 */
const convertMockDataToDTOs = (): ResourcePackDTO[] => {
    return mockResourcePacks.map(pack => ({
        ...pack,
        uploadDate: pack.uploadDate.toISOString(),
        lastModified: pack.lastModified.toISOString(),
        minecraftVersions: pack.minecraftVersions.map(v => ({
            ...v,
            releaseDate: v.releaseDate?.toISOString(),
        })),
    }));
};

const convertMockVersionsToDTOs = (): MinecraftVersionDTO[] => {
    return mockMinecraftVersions.map(v => ({
        ...v,
        releaseDate: v.releaseDate?.toISOString(),
    }));
};

/**
 * Fetch resource packs from API with pagination
 * Supports filtering and sorting via query parameters
 * 
 * @param filters - Optional filter criteria
 * @param sort - Optional sort configuration
 * @param page - Page number (1-indexed, default: 1)
 * @param pageSize - Number of items per page (default: 12)
 * @returns Promise resolving to paginated response with Resource Pack DTOs
 */
export const fetchResourcePacks = async (
    filters?: ResourcePackFilters,
    sort?: ResourcePackSort,
    page: number = 1,
    pageSize: number = 12
): Promise<ResourcePackListResponseDTO> => {
    const queryParams = buildQueryParams(filters, sort);
    const url = `${RESOURCE_PACKS_ENDPOINTS.list}${queryParams}&page=${page}&pageSize=${pageSize}`;
    
    // Mock implementation - simulates API call with delay and pagination
    const mockDTOs = convertMockDataToDTOs();
    
    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPacks = mockDTOs.slice(startIndex, endIndex);
    const hasMore = endIndex < mockDTOs.length;
    
    const response: ResourcePackListResponseDTO = {
        packs: paginatedPacks,
        total: mockDTOs.length,
        page,
        pageSize,
        hasMore,
    };
    
    return await mockGet(url, response);
    
    /**
     * Future: Real API implementation
     * 
     * import apiClient from '../apiClient';
     * 
     * const response = await apiClient.get<ResourcePackListResponseDTO>(url);
     * return response.data;
     */
};

/**
 * Fetch a single resource pack by ID
 * 
 * @param id - Resource pack unique identifier
 * @returns Promise resolving to Resource Pack DTO or null if not found
 */
export const fetchResourcePackById = async (id: string): Promise<ResourcePackDTO | null> => {
    const url = RESOURCE_PACKS_ENDPOINTS.detail(id);
    
    // Mock implementation
    const mockDTOs = convertMockDataToDTOs();
    const pack = mockDTOs.find(p => p.id === id);
    
    if (!pack) {
        return null;
    }
    
    return await mockGet(url, pack);
    
    /**
     * Future: Real API implementation
     * 
     * try {
     *     const response = await apiClient.get<ResourcePackDTO>(url);
     *     return response.data;
     * } catch (error) {
     *     if (error.response?.status === 404) {
     *         return null;
     *     }
     *     throw error;
     * }
     */
};

/**
 * Fetch all available Minecraft versions
 * 
 * @returns Promise resolving to array of Minecraft Version DTOs
 */
export const fetchMinecraftVersions = async (): Promise<MinecraftVersionDTO[]> => {
    const url = MINECRAFT_VERSIONS_ENDPOINTS.list;
    
    // Mock implementation
    const mockDTOs = convertMockVersionsToDTOs();
    const response = await mockGet(url, mockDTOs);
    
    return response;
    
    /**
     * Future: Real API implementation
     * 
     * const response = await apiClient.get<MinecraftVersionsResponseDTO>(url);
     * return response.data.versions;
     */
};

/**
 * Trigger download for a resource pack
 * In real implementation, this would return a signed download URL
 * 
 * @param id - Resource pack unique identifier
 * @returns Promise resolving to download URL
 */
export const downloadResourcePack = async (id: string): Promise<string> => {
    // const url = RESOURCE_PACKS_ENDPOINTS.download(id); // Will be used with real API
    
    // Mock implementation - return the pack's download URL
    const mockDTOs = convertMockDataToDTOs();
    const pack = mockDTOs.find(p => p.id === id);
    
    if (!pack) {
        throw new Error(`Resource pack with ID ${id} not found`);
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return pack.downloadUrl;
    
    /**
     * Future: Real API implementation
     * 
     * const response = await apiClient.get<{ downloadUrl: string }>(url);
     * return response.data.downloadUrl;
     */
};
