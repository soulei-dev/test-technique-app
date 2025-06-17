export type CategoriesGroup = {
  id: number;
  label: string;
  color: string;
};

export type Category = {
  id: number;
  groupId: CategoriesGroup["id"];
  label: string;
  description: string;
};