/**
 * Base API Client
 * Mock HTTP client that simulates realistic API behavior
 * Will be replaced with Axios or Fetch when backend is ready
 * 
 * Simulates:
 * - Network delays (300ms)
 * - Async operations
 * - Success responses
 */

/**
 * Simulates an HTTP GET request with realistic delay
 * @param _url - API endpoint URL (currently unused in mock)
 * @param data - Mock data to return
 * @returns Promise resolving to mock data after delay
 */
export const mockGet = async <T>(_url: string, data: T): Promise<T> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return data;
};

/**
 * Simulates an HTTP POST request with realistic delay
 * @param _url - API endpoint URL (currently unused in mock)
 * @param _body - Request body (currently unused in mock)
 * @param data - Mock data to return
 * @returns Promise resolving to mock data after delay
 */
export const mockPost = async <T>(_url: string, _body: unknown, data: T): Promise<T> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return data;
};

/**
 * Future: Real API client configuration
 * When backend is ready, replace mock functions with:
 * 
 * import axios from 'axios';
 * 
 * const apiClient = axios.create({
 *     baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
 *     timeout: 10000,
 *     headers: {
 *         'Content-Type': 'application/json',
 *     },
 * });
 * 
 * export default apiClient;
 */
