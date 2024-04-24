import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Income {
  source: string;
  amount: number;
  editing?: boolean;
  backup?: Income;
}

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})

export class IncomeComponent {
  incomeForm: any;
  selectedMonth: string;
  januaryIncomes: Income[] = [
    { source: 'Salary', amount: 5000 },
    { source: 'Freelancing', amount: 1000 },
  ];
  februaryIncomes: Income[] = [
    { source: 'Salary', amount: 5500 },
    { source: 'Rental Income', amount: 700 },
  ];
  marchIncomes: Income[] = [
    { source: 'Salary', amount: 5200 },
    { source: 'Freelancing', amount: 1200 },
    { source: 'Rental Income', amount: 600 },
  ];
  monthSelected: boolean = false;
  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {
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
    this.getFilteredIncomes();
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string): Income[] {
    switch (month) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }

  getFilteredIncomes() {
    let filteredIncomes: Income[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes = [...this.februaryIncomes];
        break;
      case 'March':
        filteredIncomes = [...this.marchIncomes];
        break;
      default:
        break;
    }
    return filteredIncomes;
  }

  editIncome(income: Income) {
    income.editing = true;
    income.backup = { ...income };
  }

  saveIncome(income: Income) {
    income.editing = false;
    delete income.backup;
  }

  cancelEdit(income: Income) {
    income.editing = false;
    Object.assign(income, income.backup);
    delete income.backup;
  }

  deleteIncome(income: Income) {
    let monthIncomes = this.getIncomesForMonth(this.selectedMonth);
    const index = monthIncomes.indexOf(income);
    if (index !== -1) {
      monthIncomes.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryIncomes.push(newIncome);
          break;
        case 'February':
          this.februaryIncomes.push(newIncome);
          break;
        case 'March':
          this.marchIncomes.push(newIncome);
          break;
        default:
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({
        month: '',
        source: '',
        amount: '',
      });
    }
  }

  // saveForm() {
  //   console.log('Form saved!');
  // }

  onBack() {
    this.router.navigate(['']);
  }
}
