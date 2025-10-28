import type { ResourcePack, ResourcePackFilters, ResourcePackSort } from '../models/ResourcePack';
import { mockResourcePacks, mockMinecraftVersions } from './mockData';

/**
 * Resource Pack Service
 * Business logic layer for resource pack operations
 * This service will later be replaced with actual API calls
 * No UI dependencies - pure business logic
 */

export class ResourcePackService {
    /**
     * Get all resource packs with optional filters and sorting
     * @param filters - Optional filter criteria
     * @param sort - Optional sort configuration
     * @returns Filtered and sorted array of resource packs
     */
    static getResourcePacks(
        filters?: ResourcePackFilters,
        sort?: ResourcePackSort
    ): ResourcePack[] {
        let packs = [...mockResourcePacks];

        // Apply filters
        if (filters) {
            packs = this.applyFilters(packs, filters);
        }

        // Apply sorting
        if (sort) {
            packs = this.applySorting(packs, sort);
        }

        return packs;
    }

    /**
     * Get a single resource pack by ID
     * @param id - Resource pack unique identifier
     * @returns Resource pack if found, undefined otherwise
     */
    static getResourcePackById(id: string): ResourcePack | undefined {
        return mockResourcePacks.find(pack => pack.id === id);
    }

    /**
     * Get all available Minecraft versions
     * @returns Array of all Minecraft versions
     */
    static getMinecraftVersions() {
        return mockMinecraftVersions;
    }

    /**
     * Apply filters to resource pack list
     * @param packs - Array of resource packs to filter
     * @param filters - Filter criteria
     * @returns Filtered array of resource packs
     */
    private static applyFilters(
        packs: ResourcePack[],
        filters: ResourcePackFilters
    ): ResourcePack[] {
        return packs.filter(pack => {
            // Search query filter
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                const matchesSearch = 
                    pack.name.toLowerCase().includes(query) ||
                    pack.description.toLowerCase().includes(query) ||
                    pack.tags.some(tag => tag.toLowerCase().includes(query));
                
                if (!matchesSearch) return false;
            }

            // Minecraft version filter
            if (filters.minecraftVersionIds && filters.minecraftVersionIds.length > 0) {
                const hasMatchingVersion = pack.minecraftVersions.some(version =>
                    filters.minecraftVersionIds!.includes(version.id)
                );
                if (!hasMatchingVersion) return false;
            }

            // Mod filter
            if (filters.modIds && filters.modIds.length > 0) {
                const hasMatchingMod = pack.supportedMods.some(mod =>
                    filters.modIds!.includes(mod.id)
                );
                if (!hasMatchingMod) return false;
            }

            // Modpack filter
            if (filters.modpackIds && filters.modpackIds.length > 0) {
                const hasMatchingModpack = pack.supportedModpacks.some(modpack =>
                    filters.modpackIds!.includes(modpack.id)
                );
                if (!hasMatchingModpack) return false;
            }

            // Tags filter
            if (filters.tags && filters.tags.length > 0) {
                const hasMatchingTag = filters.tags.some(tag =>
                    pack.tags.includes(tag)
                );
                if (!hasMatchingTag) return false;
            }

            return true;
        });
    }

    /**
     * Apply sorting to resource pack list
     * @param packs - Array of resource packs to sort
     * @param sort - Sort configuration
     * @returns Sorted array of resource packs
     */
    private static applySorting(
        packs: ResourcePack[],
        sort: ResourcePackSort
    ): ResourcePack[] {
        const sorted = [...packs].sort((a, b) => {
            let comparison = 0;

            switch (sort.sortBy) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'uploadDate':
                    comparison = a.uploadDate.getTime() - b.uploadDate.getTime();
                    break;
                case 'downloadCount':
                    comparison = a.downloadCount - b.downloadCount;
                    break;
            }

            return sort.direction === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }
}
