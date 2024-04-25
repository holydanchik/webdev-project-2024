import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { items } from '../../testDB';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: string;
  items: any[] = items;
  monthSelected: boolean = false;
  budgetCategories: { id: number; name: string }[] = [
    { id: 1, name: 'Salary' },
    { id: 2, name: 'Freelancing' },
    { id: 3, name: 'Rental Income' },
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
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required],
    });
  }

  getExpensesForMonth(month: string): any[] {
    return this.items.filter((item) => {
      const date = new Date(item.date);
      const itemMonth = date.toLocaleString('default', { month: 'long' });
      return itemMonth === month;
    });
  }

  getFilteredExpenses() {
    if (!this.monthSelected || this.selectedMonth === 'Year') {
      return this.items;
    }
    return this.getExpensesForMonth(this.selectedMonth);
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getUniqueMonths(): string[] {
    const monthsSet = new Set<string>();
    items.forEach((item) => {
      const date = new Date(item.date);
      const month = date.toLocaleString('default', { month: 'long' });
      monthsSet.add(month);
    });
    return ['Year', ...Array.from(monthsSet)];
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    if (!this.monthSelected || month === 'Year') {
      for (const expense of this.items) {
        if (expense.income) {
          totalExpense += expense.amount;
        } else {
          totalExpense -= expense.amount;
        }
      }
    } else {
      const expenses = this.getExpensesForMonth(month);
      for (const expense of expenses) {
        if (expense.income) {
          totalExpense += expense.amount;
        } else {
          totalExpense -= expense.amount;
        }
      }
    }
    return totalExpense;
  }

  getSourceById(id: number): string {
    switch (id) {
      case 1:
        return 'Salary';
      case 2:
        return 'Freelancing';
      case 3:
        return 'Rental Income';
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

  onBack() {
    this.router.navigate(['']);
  }
}
