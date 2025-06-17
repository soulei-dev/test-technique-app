import api from '@shared/api/api';
import { Operation } from '@operations/types';

type GetOperationsParams = {
  offset?: number;
  limit?: number;
  search?: string;
};

type GetOperationsResponse = Operation[];

/**
 * Fetches a paginated list of operations from the API with optional search filtering.
 * Sends `offset`, `limit`, and `search` as query parameters.
 *
 * @param params - Query parameters for pagination and filtering:
 *  - offset: the number of items to skip (default: 0)
 *  - limit: the number of items to retrieve (default: 10)
 *  - search: an optional string to filter operations by label
 *
 * @returns A promise resolving to an array of `Operation` objects
 *
 * @throws Will throw an error if the API request fails
 */
export const getOperationsPaginatedApi = async ({
  offset = 0,
  limit = 10,
  search,
}: GetOperationsParams): Promise<GetOperationsResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('offset', offset.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);

    const response = await api.get(`/operations?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error in getOperationsPaginatedApi:', error);
    throw error;
  }
};
