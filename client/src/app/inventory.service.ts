import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError,Subject } from 'rxjs';
import { newItem } from './dialog/dialog.component';
import { response } from 'express';

export interface Item {
  id?: number;
  name: string;
  categoryName: string; // Directly use the category name
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000';  // Backend API URL
  private categoryAddedSubject = new Subject<void>();
  public categoryAdded$ = this.categoryAddedSubject.asObservable();
  private categoryRemovedSubject = new Subject<void>();
  public categoryRemoved$ = this.categoryRemovedSubject.asObservable();
  private itemAddedSubject = new Subject<void>();
  public itemAdded$ = this.itemAddedSubject.asObservable();
  private itemRemovedSubject = new Subject<void>();
  public itemRemoved$ = this.itemRemovedSubject.asObservable();

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

    this.http.delete(`${this.apiUrl}/deletecategory`, options).pipe(
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
        console.error('Error during DELETE category request:', error);
      }
    });
    return this.http.delete(`${this.apiUrl}/deletecategory`, options);
  }

  public deleteItem(itemId: string){
    const body = {id: parseInt(itemId)};
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body
    }; 
    this.http.delete(`${this.apiUrl}/deleteItem`, options).pipe(
      //
    ).subscribe({
      next: (response)=>{
        console.log('Item removed successfully: ', response);
        this.itemRemovedSubject.next();
      },
      error: (error)=>{
        console.log('Error during DELETE item request: ',error)
      }
    });
    return this.http.delete(`${this.apiUrl}/deleteItem`, options);
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

  public addItem(item: newItem): Observable<any> {
    const itemToAdd = {
      item_name: item.name,
      item_categories: item.fkCategory
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }); 
    this.http.post(`${this.apiUrl}/newitem`, itemToAdd, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding category:', error);
        return throwError(() => new Error('Error adding category'));
      })
    ).subscribe({
      next: (response) => {
        console.log('Category added successfully:', response);
        this.itemAddedSubject.next();
      },
      error: (error) => {
        console.error('Error during POST request:', error);
      }
    });
    return this.http.post(`${this.apiUrl}/newcategory`, itemToAdd, { headers });
  }
}
