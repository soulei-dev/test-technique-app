import CategoryGroupItem from '@categories/components/CategoryGroupItem/CategoryGroupItem';
import CategorySortButtons, {
  FilterOption,
} from '@categories/components/CategorySortButtons/CategorySortButtons';
import { useCategoriesGroupsQuery } from '@categories/hooks/useCategoriesGroupsQuery';
import { useCategoriesQuery } from '@categories/hooks/useCategoriesQuery';
import {
  groupCategoriesByGroup,
  GroupedCategories,
} from '@categories/utils/groupCategoriesByGroup';
import { FlashList } from '@shopify/flash-list';
import { Spacer } from '@ui/components/Spacer/Spacer';
import { TagColorKey } from '@ui/theme/tagColors';
import { useMemo, useState } from 'react';
import styled from 'styled-components/native';

const CategoriesScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const { data: categories, refetch: refetchCategories } = useCategoriesQuery();

  const { data: categoriesGroups, refetch: refetchCategoriesGroups } =
    useCategoriesGroupsQuery();

  const groupedCategories: GroupedCategories[] = useMemo(() => {
    if (!categories || !categoriesGroups) return [];
    return groupCategoriesByGroup(categories, categoriesGroups);
  }, [categories, categoriesGroups]);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetchCategories();
      await refetchCategoriesGroups();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSortChange = (filter: FilterOption) => {
    console.log('DEBUG selectedFilter is -> ', filter);
  };

  return (
    <Container>
      <Row>
        <Label>Trier par</Label>
        <CategorySortButtons onChange={handleSortChange} />
      </Row>
      <Spacer size={16} />
      <FlashList
        data={groupedCategories}
        estimatedItemSize={100}
        keyExtractor={(item) => String(item.groupId)}
        renderItem={({ item }) => (
          <CategoryGroupItem
            label={item.label}
            color={item.color as TagColorKey}
            categories={item.categories}
          />
        )}
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
