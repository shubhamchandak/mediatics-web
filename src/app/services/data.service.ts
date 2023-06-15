import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'http://127.0.0.1:8000/get-result-from-url';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.url);
  }
}
