import CategoryGroupItem from '@categories/components/CategoryGroupItem/CategoryGroupItem';
import CategoryItem from '@categories/components/CategoryItem/CategoryItem';
import CategorySortButtons, {
  FilterOption,
} from '@categories/components/CategorySortButtons/CategorySortButtons';
import { useSelectedCategory } from '@categories/context/SelectedCategoryContext';
import { useCategoriesGroupsQuery } from '@categories/hooks/useCategoriesGroupsQuery';
import { useCategoriesQuery } from '@categories/hooks/useCategoriesQuery';
import { useCategoryFilter } from '@categories/hooks/useCategoryFilter';
import { CategoriesGroup, Category } from '@categories/types';
import { FlashList } from '@shopify/flash-list';
import { Spacer } from '@ui/components/Spacer/Spacer';
import { TagColorKey } from '@ui/theme/tagColors';
import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const CategoriesScreen = () => {
  const router = useRouter();
  const { setCategory } = useSelectedCategory();
  const inset = useSafeAreaInsets();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const { data: categories, refetch: refetchCategories } = useCategoriesQuery();
  const { data: categoriesGroups, refetch: refetchCategoriesGroups } =
    useCategoriesGroupsQuery();

  const { filter, setFilter, listData } = useCategoryFilter(
    categories,
    categoriesGroups,
  );

  const handleCategorySelect = (category: Category, group: CategoriesGroup) => {
    setCategory(category, group);
    router.back();
  };

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
          onCategorySelect={handleCategorySelect}
        />
      );
    }

    const category = item as Category;
    const group = categoriesGroups?.find((g) => g.id === category.groupId);

    const isLast = index === listData.length - 1;

    return (
      <CategoryItem
        category={category}
        showDivider={!isLast}
        onPress={() => group && handleCategorySelect(category, group)}
      />
    );
  };

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
