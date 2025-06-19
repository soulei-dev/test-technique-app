import { useQuery } from '@tanstack/react-query';
import { getOperationByIdApi } from '@operations/api/operationsService';
import { Operation } from '@operations/types';
import { operationsKeys } from '@operations/operationsKeys';

/**
 * React Query hook to fetch a single operation by ID.
 *
 * @param {number} id - The ID of the operation to fetch.
 * @returns Query result with operation data and status.
 */
export const useOperationByIdQuery = (id: number) => {
  return useQuery<Operation, Error>({
    queryKey: operationsKeys.detail(id),
    queryFn: () => getOperationByIdApi(id),
    enabled: !!id,
  });
};
