/**
 * Format Utilities
 * Pure utility functions for formatting data for display
 * No business logic, no side effects
 */

/**
 * Format bytes to human-readable file size
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "15 MB", "2.5 GB")
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
};

/**
 * Format number with locale-specific thousands separators
 * @param num - Number to format
 * @returns Formatted string (e.g., "1,234,567")
 */
export const formatNumber = (num: number): string => {
    return num.toLocaleString();
};

/**
 * Format date to short readable format
 * @param date - Date object
 * @returns Formatted string (e.g., "Jan 15, 2024")
 */
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
