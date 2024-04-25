import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BudgetItem, Category, Token} from "./models";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  BASE_URL = 'localhost:8000'

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}/api/budgetCategory/`)
  }

  getBudgetItems(): Observable<BudgetItem[]> {
    return this.http.get<BudgetItem[]>(`${this.BASE_URL}/api/budgetItem/`)
  }

  getBudgetItem(id: number): Observable<BudgetItem> {
    return this.http.get<BudgetItem>(`${this.BASE_URL}/api/budgetItems/${id}`)
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/api/user/`)
  }

  login(username: string, password: string) {
    return this.http.post<Token>(`${
        this.BASE_URL}/api/login/`,
      {username, password})
  }


  register(username: string, password: string, email: string) {
    const userData = {
      username: username,
      password: password,
      email: email
    };

    return this.http.post<any>(`${this.BASE_URL}/api/`, userData)
  }

}
