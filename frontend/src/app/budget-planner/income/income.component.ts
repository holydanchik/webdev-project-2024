import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { incomeItems } from '../../testDB';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent implements OnInit {
  incomeForm: any;
  selectedMonth: string = '';
  budgetItems: any[] = incomeItems;
  monthSelected: boolean = false;
  budgetCategories: { id: number; name: string }[] = [
    { id: 1, name: 'Salary' },
    { id: 2, name: 'Freelancing' },
    { id: 3, name: 'Rental Income' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', {
      month: 'long',
    });
  }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    const incomes = this.getIncomesForMonth(month);
    for (const income of incomes) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string): any[] {
    return this.budgetItems.filter((item) => {
      const date = new Date(item.date);
      const itemMonth = date.toLocaleString('default', { month: 'long' });
      return itemMonth === month;
    });
  }

  getFilteredIncomes() {
    return this.getIncomesForMonth(this.selectedMonth);
  }

  getUniqueMonths(): string[] {
    const monthsSet = new Set<string>();
    incomeItems.forEach((item) => {
      const date = new Date(item.date);
      const month = date.toLocaleString('default', { month: 'long' });
      monthsSet.add(month);
    });
    return Array.from(monthsSet);
  }

  getSourceById(id: number): string {
    switch (id) {
      case 1:
        return 'Salary';
      case 2:
        return 'Freelancing';
      case 3:
        return 'Rental Income';
      default:
        return 'Unknown';
    }
  }

  deleteIncome(income: any) {
    const index = this.budgetItems.indexOf(income);
    if (index !== -1) {
      this.budgetItems.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = {
        amount: this.incomeForm.value.amount,
        date: this.selectedMonth,
        income: true,
        budgetCategory: +this.incomeForm.value.source,
      };
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formattedMonth = month < 10 ? '0' + month : '' + month;
      const formattedDay = day < 10 ? '0' + day : '' + day;
      newIncome.date = `${year}-${formattedMonth}-${formattedDay}`;
      this.budgetItems.push(newIncome);
      console.log(newIncome);
      this.incomeForm.reset();
      this.incomeForm.patchValue({
        month: '',
        source: '',
        amount: '',
      });
      this.getFilteredIncomes();
    }
  }

  onBack() {
    this.router.navigate(['']);
  }
}
