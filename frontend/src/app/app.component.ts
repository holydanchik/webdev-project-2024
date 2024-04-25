import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {BudgetService} from "./budget.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'budget-planner';
  logged!: boolean; // для отображение самоно login-page

  username!: string;
  password!: string;

  constructor(private budgetService: BudgetService, private router: Router) {
  }

  ngOnInit() {
    const access = localStorage.getItem("access")
    if (access) {
      this.logged = true;
    } else {
      this.router.navigate(['/login'])
    }
  }

  login() {
    this.budgetService.login(this.username, this.password).subscribe(data => {
      console.log(data)
      this.logged = true
      localStorage.setItem("access", data.access)
      localStorage.setItem("refresh", data.refresh)
    })
  }

  logout() {
    this.logged = false
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
  }
}
