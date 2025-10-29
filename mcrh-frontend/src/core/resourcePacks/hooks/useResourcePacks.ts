import { useState, useEffect, useMemo } from 'react';
import type { ResourcePack, ResourcePackFilters, ResourcePackSort, MinecraftVersion } from '../models/ResourcePack';
import { fetchResourcePacks, fetchMinecraftVersions } from '../../../api/resourcePacks/resourcePacksApi';
import { mapResourcePacksFromDTO, mapMinecraftVersionsFromDTO } from '../../../api/resourcePacks/mappers';
import { ResourcePackService } from '../services/ResourcePackService';

/**
 * Custom hook for resource pack operations
 * Encapsulates business logic and state management
 * Connects UI to API layer, uses mappers to convert DTOs to domain models
 * 
 * Architecture flow: UI → Hook → API → Mapper → Domain
 * 
 * @param initialFilters - Initial filter configuration
 * @param initialSort - Initial sort configuration
 * @returns Resource packs state and operations
 */

export const useResourcePacks = (
    initialFilters?: ResourcePackFilters,
    initialSort?: ResourcePackSort
) => {
    const [packs, setPacks] = useState<ResourcePack[]>([]);
    const [filters, setFilters] = useState<ResourcePackFilters>(initialFilters || {});
    const [sort, setSort] = useState<ResourcePackSort>(initialSort || { sortBy: 'name', direction: 'asc' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch packs when filters or sort change
    useEffect(() => {
        const fetchPacks = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Fetch DTOs from API
                const dtos = await fetchResourcePacks(filters, sort);
                
                // Convert DTOs to domain models
                const domainPacks = mapResourcePacksFromDTO(dtos);
                
                // Apply client-side filtering and sorting
                // (API will handle this in production, but mock API returns all data)
                const filtered = ResourcePackService.applyFilters(domainPacks, filters);
                const sorted = ResourcePackService.applySorting(filtered, sort);
                
                setPacks(sorted);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch resource packs');
                setPacks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPacks();
    }, [filters, sort]);

    /**
     * Update filters (merges with existing filters)
     * @param newFilters - Partial filter updates
     */
    const updateFilters = (newFilters: Partial<ResourcePackFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    /**
     * Update sort configuration
     * @param newSort - New sort configuration
     */
    const updateSort = (newSort: ResourcePackSort) => {
        setSort(newSort);
    };

    /**
     * Clear all filters
     */
    const clearFilters = () => {
        setFilters({});
    };

    return {
        packs,
        filters,
        sort,
        loading,
        error,
        updateFilters,
        updateSort,
        clearFilters,
    };
};

/**
 * Hook to get available Minecraft versions
 * Fetches from API and converts DTOs to domain models
 * 
 * @returns Minecraft versions state with loading indicator
 */
export const useMinecraftVersions = () => {
    const [versions, setVersions] = useState<MinecraftVersion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVersions = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Fetch DTOs from API
                const dtos = await fetchMinecraftVersions();
                
                // Convert DTOs to domain models
                const domainVersions = mapMinecraftVersionsFromDTO(dtos);
                
                setVersions(domainVersions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch Minecraft versions');
                setVersions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVersions();
    }, []);

    return useMemo(() => ({ versions, loading, error }), [versions, loading, error]);
};
