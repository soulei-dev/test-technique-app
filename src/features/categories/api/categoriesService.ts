import { Category, CategoriesGroup } from '@categories/types';
import api from '@shared/api/api';

const CATEGORIES_URL = "/categories";
const CATEGORIES_GROUPS_URL = "/categories-groups";

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

/**
 * Fetch all categories groups from the API.
 *
 * @returns {Promise<CategoriesGroup[]>} List of categories.
 */
export const getCategoriesGroupsApi = async (): Promise<CategoriesGroup[]> => {
  try {
    const response = await api.get<CategoriesGroup[]>(`${CATEGORIES_GROUPS_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error in getCategoriesGroupsApi:', error);
    throw error;
  }
};
