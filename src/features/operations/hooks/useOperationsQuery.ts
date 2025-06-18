import { useInfiniteQuery } from '@tanstack/react-query';
import { getOperationsPaginatedApi } from '@operations/api/operationsService';

/**
 * Custom React hook to fetch paginated operations from the API
 * based on a given search term.
 *
 * Uses `useInfiniteQuery` from TanStack React Query to manage
 * pagination, caching, loading states, and errors.
 *
 * @param {string} searchTerm - The keyword used to filter operations.
 *
 * @returns {{
 *   data: InfiniteData<Operation[]> | undefined,
 *   fetchNextPage: () => void,
 *   hasNextPage: boolean | undefined,
 *   isFetchingNextPage: boolean,
 *   isLoading: boolean,
 *   isError: boolean,
 *   refetch: () => void,
 *   isFetching: boolean,
 *   status: 'idle' | 'error' | 'loading' | 'success',
 * }}
 *
 * @example
 * const {
 *   data,
 *   fetchNextPage,
 *   hasNextPage,
 *   isFetchingNextPage,
 *   isLoading,
 *   isError,
 *   refetch,
 *   isFetching,
 * } = useOperationsQuery('groceries');
 */
export const useOperationsQuery = (searchTerm: string) => {
  return useInfiniteQuery({
    queryKey: ['operations', searchTerm],
    queryFn: ({ pageParam }) =>
      getOperationsPaginatedApi({
        offset: pageParam,
        search: searchTerm,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 10;
      return lastPage.length === 10 ? nextOffset : undefined;
    },
  });
};
