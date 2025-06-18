import { useQuery } from '@tanstack/react-query';
import { getOperationsStatsApi } from '@operations/api/operationsService';
import { Stats } from '@operations/types';
import { operationsKeys } from '@operations/operationsKeys';

/**
 * React Query hook to fetch total operations statistics.
 *
 * @returns {Object} Query result including data, loading and error states.
 */
export const useOperationsStatsQuery = () => {
  return useQuery<Stats, Error>({
    queryKey: operationsKeys.stats(),
    queryFn: () => getOperationsStatsApi(),
  });
};
