export interface BudgetItem {
  id: number;
  budgetCategory: number;
  amount: number;
  date: string;
  income: boolean;
}

export interface Token {
  access: string,
  refresh: string
}

export interface Category {
  id: number,
  name: string
}
