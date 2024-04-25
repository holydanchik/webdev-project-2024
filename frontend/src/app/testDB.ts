import { BudgetItem } from './models';

export const items: BudgetItem[] = [
  {
    id: 1,
    budgetCategory: 1,
    amount: 10000,
    date: '2024-01-01',
    income: true,
  },
  {
    id: 2,
    budgetCategory: 2,
    amount: 5000,
    date: '2024-01-01',
    income: true,
  },
  {
    id: 3,
    budgetCategory: 3,
    amount: 2000,
    date: '2024-02-01',
    income: true,
  },
  {
    id: 4,
    budgetCategory: 2,
    amount: 4000,
    date: '2024-02-01',
    income: true,
  },
  {
    id: 5,
    budgetCategory: 1,
    amount: 11000,
    date: '2024-03-01',
    income: true,
  },
  {
    id: 6,
    budgetCategory: 3,
    amount: 2500,
    date: '2024-03-01',
    income: true,
  },
  {
    id: 7,
    budgetCategory: 2,
    amount: 1000,
    date: '2024-04-01',
    income: true,
  },
  {
    id: 8,
    budgetCategory: 3,
    amount: 300,
    date: '2024-04-01',
    income: true,
  },
  {
    id: 9,
    budgetCategory: 4,
    amount: 1000,
    date: '2024-01-01',
    income: false,
  },
  {
    id: 10,
    budgetCategory: 5,
    amount: 500,
    date: '2024-01-01',
    income: false,
  },
  {
    id: 11,
    budgetCategory: 6,
    amount: 200,
    date: '2024-02-01',
    income: false,
  },
  {
    id: 12,
    budgetCategory: 4,
    amount: 400,
    date: '2024-02-01',
    income: false,
  },
  {
    id: 13,
    budgetCategory: 5,
    amount: 1100,
    date: '2024-03-01',
    income: false,
  },
  {
    id: 14,
    budgetCategory: 6,
    amount: 250,
    date: '2024-03-01',
    income: false,
  },
  {
    id: 15,
    budgetCategory: 4,
    amount: 100,
    date: '2024-04-01',
    income: false,
  },
  {
    id: 16,
    budgetCategory: 6,
    amount: 30,
    date: '2024-04-01',
    income: false,
  },
];

export const incomeItems: BudgetItem[] = items.filter((item) => item.income);
export const expenseItems: BudgetItem[] = items.filter((item) => !item.income);
