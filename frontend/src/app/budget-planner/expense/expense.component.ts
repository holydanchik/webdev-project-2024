import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { expenseItems } from '../../testDB';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string = '';
  budgetItems: any[] = expenseItems;
  monthSelected: boolean = false;
  budgetExpenseCategories: { id: number; name: string }[] = [
    { id: 4, name: 'Rent' },
    { id: 5, name: 'Gloceries' },
    { id: 6, name: 'Utilities' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', {
      month: 'long',
    });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = {
        amount: this.expenseForm.value.amount,
        date: this.selectedMonth,
        income: false,
        budgetCategory: +this.expenseForm.value.source,
      };
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formattedMonth = month < 10 ? '0' + month : '' + month;
      const formattedDay = day < 10 ? '0' + day : '' + day;
      newExpense.date = `${year}-${formattedMonth}-${formattedDay}`;
      this.budgetItems.push(newExpense);
      console.log(newExpense);
      this.expenseForm.reset();
      this.getFilteredExpenses();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getUniqueMonths(): string[] {
    const monthsSet = new Set<string>();
    expenseItems.forEach((item) => {
      const date = new Date(item.date);
      const month = date.toLocaleString('default', { month: 'long' });
      monthsSet.add(month);
    });
    return Array.from(monthsSet);
  }

  getSourceById(id: number): string {
    switch (id) {
      case 4:
        return 'Rent';
      case 5:
        return 'Glories';
      case 6:
        return 'Utilities';
      default:
        return 'Unknown';
    }
  }

  getExpensesForMonth(month: string): any[] {
    return this.budgetItems.filter((item) => {
      const date = new Date(item.date);
      const itemMonth = date.toLocaleString('default', { month: 'long' });
      return itemMonth === month;
    });
  }

  getFilteredExpenses() {
    return this.getExpensesForMonth(this.selectedMonth);
  }

  deleteExpense(expense: any) {
    const index = this.getFilteredExpenses().indexOf(expense);
    if (index !== -1) {
      this.getFilteredExpenses().splice(index, 1);
    }
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    const expenses = this.getExpensesForMonth(month);
    for (const expense of expenses) {
      totalExpense += expense.amount;
    }
    return totalExpense;
  }

  // saveForm() {
  //   console.log('Form saved!');
  // }

  onBack() {
    this.router.navigate(['']);
  }
}
