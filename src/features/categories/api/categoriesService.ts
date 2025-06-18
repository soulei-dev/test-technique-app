import { Category } from '@categories/types';
import api from '@shared/api/api';

const CATEGORIES_URL = "/categories";

/**
 * Fetch all categories from the API.
 *
 * @returns {Promise<Category[]>} List of categories.
 */
export const getCategoriesApi = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>(`${CATEGORIES_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error in getCategoriesApi:', error);
    throw error;
  }
};
