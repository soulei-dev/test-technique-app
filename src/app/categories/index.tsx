import CategoryGroupItem from '@categories/components/CategoryGroupItem/CategoryGroupItem';
import CategoryItem from '@categories/components/CategoryItem/CategoryItem';
import CategorySortButtons, {
  FilterOption,
} from '@categories/components/CategorySortButtons/CategorySortButtons';
import { useCategoriesGroupsQuery } from '@categories/hooks/useCategoriesGroupsQuery';
import { useCategoriesQuery } from '@categories/hooks/useCategoriesQuery';
import { Category } from '@categories/types';
import {
  groupCategoriesByGroup,
  GroupedCategories,
} from '@categories/utils/groupCategoriesByGroup';
import { FlashList } from '@shopify/flash-list';
import { Spacer } from '@ui/components/Spacer/Spacer';
import { TagColorKey } from '@ui/theme/tagColors';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const CategoriesScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterOption>('group');

  const inset = useSafeAreaInsets();

  const { data: categories, refetch: refetchCategories } = useCategoriesQuery();
  const { data: categoriesGroups, refetch: refetchCategoriesGroups } =
    useCategoriesGroupsQuery();

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

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetchCategories();
      await refetchCategoriesGroups();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSortChange = (newFilter: FilterOption) => {
    setFilter(newFilter);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (filter === 'group') {
      return (
        <CategoryGroupItem
          label={item.label}
          color={item.color as TagColorKey}
          categories={item.categories}
        />
      );
    }

    const category = item as Category;
    const isLast = index === listData.length - 1;

    return <CategoryItem category={category} showDivider={!isLast} />;
  };

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

  return (
    <Container>
      <Row>
        <Label>Trier par</Label>
        <CategorySortButtons onChange={handleSortChange} />
      </Row>
      <Spacer size={16} />
      <FlashList
        data={listData}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingBottom: inset.bottom }}
        keyExtractor={(item) =>
          filter === 'group' ? String(item.groupId) : String(item.id)
        }
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};

export default CategoriesScreen;

const Container = styled.View({
  flex: 1,
  paddingTop: 16,
});

const Row = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 20,
  paddingHorizontal: 24,
});

const Label = styled.Text({
  fontSize: 16,
  fontFamily: 'OpenSans-Regular',
});
