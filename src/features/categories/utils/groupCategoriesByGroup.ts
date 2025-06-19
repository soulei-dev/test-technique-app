import { Category } from '@categories/types';
import { CategoriesGroup } from '@categories/types';

export type GroupedCategories = {
  groupId: number;
  label: string;
  color: string;
  categories: Category[];
};

/**
 * Groups categories under their corresponding category group.
 *
 * @param categories - Flat list of categories
 * @param categoryGroups - List of groups
 * @returns Array of grouped categories by groupId
 */
export const groupCategoriesByGroup = (
  categories: Category[],
  categoryGroups: CategoriesGroup[]
): GroupedCategories[] => {
  return categoryGroups.map((group) => ({
    groupId: group.id,
    label: group.label,
    color: group.color,
    categories: categories.filter((cat) => cat.groupId === group.id),
  }));
};
