import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000';  // Backend API URL

  constructor(private http: HttpClient) {}

  // Method to fetch data from the backend
  public getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allitems`);
  }
  public getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allCategories`);
  }
  public addCategory(categoryName: string): Observable<any> {
    const body = { name: categoryName };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }); 
    this.http.post(`${this.apiUrl}/newcategory`, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding category:', error);
        return throwError(() => new Error('Error adding category'));
      })
    ).subscribe({
      next: (response) => {
        console.log('Category added successfully:', response);
      },
      error: (error) => {
        console.error('Error during POST request:', error);
      }
    });
  // TODO: refresh UI somewhere so that user get to know the add success
    return this.http.post(`${this.apiUrl}/newcategory`, body, { headers });
  }
}
