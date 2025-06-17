import { Category } from '@categories/types';

export type Stats = {
  incomesTotal: number;
  outcomesTotal: number;
  balanceTotal: number;
};

export type Operation = {
  id: number;
  categoryId?: Category["id"];
  amount: number;
  label: string;
  description: string;
  date: string;
};

export type GroupedOperations = {
  date: string;
  operations: Operation[];
};