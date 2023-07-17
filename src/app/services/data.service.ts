import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getCommentsAnalytics() {
    return this.http.get(this.baseUrl + "getCommentsAnalytics");
  }

  getItemDashboardData() {
    return this.http.get(this.baseUrl + "getItemDashboardData")
  }
}
