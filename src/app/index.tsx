import styled from 'styled-components/native';
import CustomSearchBar from '@ui/components/CustomSearchBar/CustomSearchBar';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Spacer } from '@ui/components/Spacer/Spacer';
import OperationsSummaryCard from '@operations/components/OperationsSummaryCard/OperationsSummaryCard';
import { ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { getOperationsPaginatedApi } from '@operations/api/operationsService';
import { groupOperationsByDate } from '@operations/utils/groupOperationsByDate';
import OperationGroupItem from '@operations/components/OperationGroupItem/OperationGroupItem';
import { useState } from 'react';
import CustomButton from '@ui/components/CustomButton/CustomButton';
import { COLORS } from '@ui/theme/colors';

const OperationsScreen = () => {
  const inset = useSafeAreaInsets();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['operations'],
    queryFn: async ({ pageParam = 0 }) =>
      getOperationsPaginatedApi({ offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 10;
      return lastPage.length === 10 ? nextOffset : undefined;
    },
  });

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const operations = data?.pages.flat() ?? [];

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const listHeaderComponent = () => {
    return (
      <Container>
        <Spacer size={12} />
        <CustomSearchBar placeholder="Rechercher un élément" />
        <Spacer size={16} />
        <OperationsSummaryCard
          data={{
            incomesTotal: 5917.32,
            outcomesTotal: -7941.11,
            balanceTotal: -2023.79,
          }}
        />
        <Spacer size={10} />
      </Container>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaContainer edges={['top']}>
        <ActivityIndicator size="large" />
      </SafeAreaContainer>
    );
  }

  if (isError) {
    return (
      <SafeAreaContainer edges={['top']}>
        <CenteredView>
          <ErrorText>Un problème est survenue</ErrorText>
          <Spacer size={12} />
          <CustomButton label="Réessayez" onPress={() => refetch()} />
        </CenteredView>
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer edges={['top']}>
      <FlashList
        data={groupOperationsByDate(operations)}
        estimatedItemSize={200}
        keyExtractor={(item) => item.date}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: inset.bottom }}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size={'small'} /> : null
        }
        renderItem={({ item }) => (
          <OperationGroupItem date={item.date} operations={item.operations} />
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

const Container = styled.View({
  paddingHorizontal: 24,
});

const ErrorText = styled.Text({
  color: COLORS.text,
  textAlign: 'center',
  fontFamily: 'OpenSans-Semibold',
});

const CenteredView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 24,
});
