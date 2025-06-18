import { useQuery } from '@tanstack/react-query';
import { CategoriesGroup } from '@categories/types';
import { getCategoriesGroupsApi } from '@categories/api/categoriesService';
import { categoriesKeys } from '@categories/categoriesKeys';

/**
 * React Query hook to fetch categories groups from the API.
 *
 * @returns {Object} Query result containing data, loading and error states.
 */
export const useCategoriesGroupsQuery = () => {
  return useQuery<CategoriesGroup[], Error>({
    queryKey: categoriesKeys.groups(),
    queryFn: () => getCategoriesGroupsApi(),
  });
};
