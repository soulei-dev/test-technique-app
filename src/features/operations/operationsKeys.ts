export const operationsKeys = {
  all: ['operations'] as const,
  list: (search?: string) => [...operationsKeys.all, 'list', search] as const,
  stats: () => [...operationsKeys.all, 'stats'] as const,
};
