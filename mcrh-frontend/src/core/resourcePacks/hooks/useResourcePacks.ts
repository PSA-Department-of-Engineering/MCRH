import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ResourcePack, ResourcePackFilters, ResourcePackSort, MinecraftVersion } from '../models/ResourcePack';
import { fetchResourcePacks, fetchMinecraftVersions } from '../../../api/resourcePacks/resourcePacksApi';
import { mapResourcePacksFromDTO, mapMinecraftVersionsFromDTO } from '../../../api/resourcePacks/mappers';
import { ResourcePackService } from '../services/ResourcePackService';

/**
 * Custom hook for resource pack operations with pagination and infinite scroll
 * Encapsulates business logic and state management
 * Connects UI to API layer, uses mappers to convert DTOs to domain models
 * 
 * Architecture flow: UI → Hook → API → Mapper → Domain
 * 
 * @param initialFilters - Initial filter configuration
 * @param initialSort - Initial sort configuration
 * @returns Resource packs state and operations with pagination support
 */

export const useResourcePacks = (
    initialFilters?: ResourcePackFilters,
    initialSort?: ResourcePackSort
) => {
    const [packs, setPacks] = useState<ResourcePack[]>([]);
    const [filters, setFilters] = useState<ResourcePackFilters>(initialFilters || {});
    const [sort, setSort] = useState<ResourcePackSort>(initialSort || { sortBy: 'name', direction: 'asc' });
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 12; // Fixed page size

    // Fetch initial page when filters or sort change
    useEffect(() => {
        const fetchInitialPage = async () => {
            setLoading(true);
            setError(null);
            setPage(1); // Reset to first page
            
            try {
                // Fetch paginated DTOs from API
                const response = await fetchResourcePacks(filters, sort, 1, pageSize);
                
                // Convert DTOs to domain models
                const domainPacks = mapResourcePacksFromDTO(response.packs);
                
                // Apply client-side filtering and sorting
                // (API will handle this in production, but mock API returns all data)
                const filtered = ResourcePackService.applyFilters(domainPacks, filters);
                const sorted = ResourcePackService.applySorting(filtered, sort);
                
                setPacks(sorted);
                setHasMore(response.hasMore);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch resource packs');
                setPacks([]);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialPage();
    }, [filters, sort]);

    /**
     * Load next page of resource packs
     * Appends new packs to existing list
     */
    const loadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        setError(null);
        const nextPage = page + 1;
        
        try {
            // Fetch next page
            const response = await fetchResourcePacks(filters, sort, nextPage, pageSize);
            
            // Convert DTOs to domain models
            const domainPacks = mapResourcePacksFromDTO(response.packs);
            
            // Apply client-side filtering and sorting
            const filtered = ResourcePackService.applyFilters(domainPacks, filters);
            const sorted = ResourcePackService.applySorting(filtered, sort);
            
            // Append new packs to existing list
            setPacks(prev => [...prev, ...sorted]);
            setPage(nextPage);
            setHasMore(response.hasMore);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load more resource packs');
        } finally {
            setLoadingMore(false);
        }
    }, [loadingMore, hasMore, page, filters, sort, pageSize]);

    /**
     * Update filters (merges with existing filters)
     * Resets pagination to first page
     * @param newFilters - Partial filter updates
     */
    const updateFilters = (newFilters: Partial<ResourcePackFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    /**
     * Update sort configuration
     * Resets pagination to first page
     * @param newSort - New sort configuration
     */
    const updateSort = (newSort: ResourcePackSort) => {
        setSort(newSort);
    };

    /**
     * Clear all filters
     * Resets pagination to first page
     */
    const clearFilters = () => {
        setFilters({});
    };

    return {
        packs,
        filters,
        sort,
        loading,
        loadingMore,
        error,
        hasMore,
        page,
        updateFilters,
        updateSort,
        clearFilters,
        loadMore,
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
