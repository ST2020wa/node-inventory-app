import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000';  // Backend API URL
  private categoryAddedSubject = new Subject<void>();
  public categoryAdded$ = this.categoryAddedSubject.asObservable();
  private categoryRemovedSubject = new Subject<void>();
  public categoryRemoved$ = this.categoryRemovedSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Method to fetch data from the backend
  public getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allitems`);
  }
  public getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allCategories`);
  }

  public deleteCategory(categoryName: string){
    const body = { name: categoryName };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body
    };

    this.http.delete(`${this.apiUrl}/delcategory`, options).pipe(
      catchError((error) => {
        console.error('Error deleting category:', error);
        return throwError(() => new Error('Error deleting category'));
      })
    ).subscribe({
      next: (response) => {
        console.log('Category removed successfully:', response);
        this.categoryRemovedSubject.next();
      },
      error: (error) => {
        console.error('Error during DELETE request:', error);
      }
    });
    return this.http.delete(`${this.apiUrl}/delcategory`, options);
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
        this.categoryAddedSubject.next();
      },
      error: (error) => {
        console.error('Error during POST request:', error);
      }
    });
    return this.http.post(`${this.apiUrl}/newcategory`, body, { headers });
  }
}
