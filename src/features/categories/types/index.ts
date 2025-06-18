import { TagColorKey } from '@ui/theme/tagColors';

export type CategoriesGroup = {
  id: number;
  label: string;
  color: TagColorKey;
};

export type Category = {
  id: number;
  groupId: CategoriesGroup["id"];
  label: string;
  description: string;
};