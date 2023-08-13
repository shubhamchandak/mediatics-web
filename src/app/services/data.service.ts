import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = environment.apiBaseUrl;


  constructor(private http: HttpClient) {}

  getCommentsAnalytics() {
    return this.http.get(this.baseUrl + "/getCommentsAnalytics");
  }

  getItemDashboardData() {
    return this.http.get(this.baseUrl + "/getItemDashboardData");
  }

  getData() {
    return this.http.get(this.baseUrl);
  }
}
