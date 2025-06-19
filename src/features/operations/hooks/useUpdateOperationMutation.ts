import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Operation } from '../types';
import { updateOperationApi } from '@operations/api/operationsService';

export const useUpdateOperationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Pick<Operation, 'amount' | 'description' | 'categoryId'>>;
    }) => updateOperationApi(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['operation', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['operations'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};
