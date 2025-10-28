import { useState, useEffect, useMemo } from 'react';
import type { ResourcePack, ResourcePackFilters, ResourcePackSort } from '../models/ResourcePack';
import { ResourcePackService } from '../services/ResourcePackService';

/**
 * Custom hook for resource pack operations
 * Encapsulates business logic and state management
 * Connects UI to domain services
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

    // Fetch packs when filters or sort change
    useEffect(() => {
        setLoading(true);
        // Simulate async operation
        const timer = setTimeout(() => {
            const result = ResourcePackService.getResourcePacks(filters, sort);
            setPacks(result);
            setLoading(false);
        }, 100);

        return () => clearTimeout(timer);
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
        updateFilters,
        updateSort,
        clearFilters,
    };
};

/**
 * Hook to get available Minecraft versions
 * @returns Memoized array of all Minecraft versions
 */
export const useMinecraftVersions = () => {
    return useMemo(() => ResourcePackService.getMinecraftVersions(), []);
};
