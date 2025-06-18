import { useQuery } from '@tanstack/react-query';
import { getCategoriesApi } from '@categories/api/categoriesService';
import { Category } from '@categories/types';
import { categoriesKeys } from '@categories/categoriesKeys';

/**
 * React Query hook to fetch the list of categories.
 *
 * @returns {Object} Query result including data, loading, and error states.
 */
export const useCategoriesQuery = () => {
  return useQuery<Category[], Error>({
    queryKey: categoriesKeys.list(),
    queryFn: getCategoriesApi,
  });
};
