import { GroupedOperations, Operation } from '@operations/types';

/**
 * Groups a list of operations by their formatted date (e.g., "17 June 2025"),
 * using the French locale format. Each group contains a date and an array of operations.
 * The resulting groups are sorted in descending order by date (most recent first).
 *
 * @param operations - An array of Operation objects to group
 * @returns An array of GroupedOperations objects, each containing a formatted date and its related operations
 */
export const groupOperationsByDate = (operations: Operation[]): GroupedOperations[] => {
  const grouped: Record<string, Operation[]> = {};

  operations.forEach((op) => {
    const date = new Date(op.date);
    const formattedDate = date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }

    grouped[formattedDate].push(op);
  });

  return Object.entries(grouped)
    .map(([date, operations]) => ({ date, operations }))
    .sort(
      (a, b) =>
        new Date(b.operations[0].date).getTime() -
        new Date(a.operations[0].date).getTime()
    );
};
