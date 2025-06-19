import React, { createContext, useContext, useState } from 'react';
import { Category } from '@categories/types';
import { CategoriesGroup } from '@categories/types';

type SelectedCategoryContextType = {
  category: Category | null;
  categoryGroup: CategoriesGroup | null;
  setCategory: (category: Category, group: CategoriesGroup) => void;
};

const SelectedCategoryContext = createContext<
  SelectedCategoryContextType | undefined
>(undefined);

export const SelectedCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setSelectedCategory] = useState<Category | null>(null);
  const [categoryGroup, setSelectedCategoryGroup] =
    useState<CategoriesGroup | null>(null);

  const setCategory = (cat: Category, group: CategoriesGroup) => {
    setSelectedCategory(cat);
    setSelectedCategoryGroup(group);
  };

  return (
    <SelectedCategoryContext.Provider
      value={{ category, categoryGroup, setCategory }}
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
};

export const useSelectedCategory = () => {
  const context = useContext(SelectedCategoryContext);
  if (!context) {
    throw new Error(
      'useSelectedCategory must be used within a SelectedCategoryProvider',
    );
  }
  return context;
};
