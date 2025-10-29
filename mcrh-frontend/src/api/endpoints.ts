/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for all API routes
 * Makes it easy to update when backend is deployed
 */

/**
 * Base API URL
 * In production, this will be loaded from environment variables
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Resource Pack endpoints
 */
export const RESOURCE_PACKS_ENDPOINTS = {
    /**
     * Get all resource packs with optional filters and sorting
     * GET /api/resource-packs?search=...&versions=...&sortBy=...&direction=...
     */
    list: `${API_BASE_URL}/resource-packs`,
    
    /**
     * Get a single resource pack by ID
     * GET /api/resource-packs/:id
     */
    detail: (id: string) => `${API_BASE_URL}/resource-packs/${id}`,
    
    /**
     * Download a resource pack
     * GET /api/resource-packs/:id/download
     */
    download: (id: string) => `${API_BASE_URL}/resource-packs/${id}/download`,
} as const;

/**
 * Minecraft Version endpoints
 */
export const MINECRAFT_VERSIONS_ENDPOINTS = {
    /**
     * Get all available Minecraft versions
     * GET /api/minecraft-versions
     */
    list: `${API_BASE_URL}/minecraft-versions`,
} as const;

/**
 * Future: Additional endpoints can be added here
 * - Mods endpoints
 * - Modpacks endpoints
 * - User/Auth endpoints (for admin panel)
 */
