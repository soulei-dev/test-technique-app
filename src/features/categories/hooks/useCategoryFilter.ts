import { useMemo, useState } from 'react';
import { Category } from '@categories/types';
import { GroupedCategories, groupCategoriesByGroup } from '../utils/groupCategoriesByGroup';
import { FilterOption } from '../components/CategorySortButtons/CategorySortButtons';
import { CategoriesGroup } from '@categories/types';

/**
 * A custom hook to manage category filtering logic.
 *
 * @param categories - The full list of categories from the API.
 * @param categoriesGroups - The full list of category groups from the API.
 * @returns An object containing:
 *   - filter: the current selected filter option ('group', 'az', 'za')
 *   - setFilter: a function to change the selected filter
 *   - listData: the filtered list based on the selected option
 */
export const useCategoryFilter = (
  categories?: Category[],
  categoriesGroups?: CategoriesGroup[]
) => {
  const [filter, setFilter] = useState<FilterOption>('group');

  const groupedCategories: GroupedCategories[] = useMemo(() => {
    if (!categories || !categoriesGroups) return [];
    return groupCategoriesByGroup(categories, categoriesGroups);
  }, [categories, categoriesGroups]);

  const sortedCategoriesAZ = useMemo(() => {
    if (!categories) return [];
    return [...categories].sort((a, b) => a.label.localeCompare(b.label));
  }, [categories]);

  const sortedCategoriesZA = useMemo(() => {
    if (!categories) return [];
    return [...categories].sort((a, b) => b.label.localeCompare(a.label));
  }, [categories]);

  const listData = useMemo(() => {
    switch (filter) {
      case 'az':
        return sortedCategoriesAZ;
      case 'za':
        return sortedCategoriesZA;
      default:
        return groupedCategories;
    }
  }, [filter, groupedCategories, sortedCategoriesAZ, sortedCategoriesZA]);

  return {
    filter,
    setFilter,
    listData,
  };
};
