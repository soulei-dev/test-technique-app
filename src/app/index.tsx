import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import OperationGroupItem from '@operations/components/OperationGroupItem/OperationGroupItem';
import styled from 'styled-components/native';
import { useCallback, useMemo, useState } from 'react';
import { COLORS } from '@ui/theme/colors';
import useDebounce from '@shared/hooks/useDebounce';
import { useOperationsQuery } from '@operations/hooks/useOperationsQuery';
import OperationsHeader from '@operations/components/OperationsHeader/OperationsHeader';
import { groupOperationsByDate } from '@operations/utils/groupOperationsByDate';
import OperationsListStatus from '@operations/components/OperationsListStatus/OperationsListStatus';
import { useOperationsStatsQuery } from '@operations/hooks/useOperationsStatsQuery';
import { Stats } from '@operations/types';
import { useCategoriesQuery } from '@categories/hooks/useCategoriesQuery';
import { useCategoriesGroupsQuery } from '@categories/hooks/useCategoriesGroupsQuery';
import ErrorState from '@ui/components/ErrorState/ErrorState';

const OperationsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const inset = useSafeAreaInsets();
  const { debounceValue: debounceSearchTerm } = useDebounce(searchTerm, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
    isFetching,
  } = useOperationsQuery(debounceSearchTerm);

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useOperationsStatsQuery();

  const { data: categories, refetch: refetchCategories } = useCategoriesQuery();

  const { data: categoriesGroups, refetch: refetchCategoriesGroups } =
    useCategoriesGroupsQuery();

  const defaultStats: Stats = {
    incomesTotal: 0,
    outcomesTotal: 0,
    balanceTotal: 0,
  };

  const flatOperations = useMemo(() => data?.pages.flat() ?? [], [data]);

  const groupedOperations = useMemo(
    () => groupOperationsByDate(flatOperations),
    [flatOperations],
  );

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
      await refetchStats();
      await refetchCategories();
      await refetchCategoriesGroups();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isStatsLoading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </CenteredView>
    );
  }

  if (isError || isStatsError) {
    return <ErrorState onRetry={handleRefresh} />;
  }

  return (
    <SafeAreaContainer edges={['top']}>
      <FlashList
        data={groupedOperations}
        estimatedItemSize={200}
        keyExtractor={(item) => item.date}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: inset.bottom }}
        ListHeaderComponent={
          <OperationsHeader
            searchTerm={searchTerm}
            onChangeSearch={(text) => setSearchTerm(text)}
            stats={stats ?? defaultStats}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size={'small'} color={COLORS.primary} />
          ) : null
        }
        ListEmptyComponent={() => (
          <OperationsListStatus isLoading={isFetching} />
        )}
        renderItem={({ item }) => (
          <OperationGroupItem
            date={item.date}
            operations={item.operations}
            categories={categories ?? []}
            categoriesGroups={categoriesGroups ?? []}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaContainer>
  );
};

export default OperationsScreen;

const SafeAreaContainer = styled(SafeAreaView)({
  flex: 1,
});

const CenteredView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 24,
});
