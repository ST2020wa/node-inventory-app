import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000';  // Backend API URL

  constructor(private http: HttpClient) {}

  // Method to fetch data from the backend
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allitems`);
  }
}
