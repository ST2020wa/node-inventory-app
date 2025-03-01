import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryService, Item } from './inventory.service';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ItemsComponent } from './items/items.component';
import { QuickStartComponent } from './quickStart/quickStart.component';
import { AddNewComponent, newItem } from './addNew/addNew.component';
import { Observable } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DialogComponent } from './dialog/dialog.component';

export enum Views {
  Start = 'quickStart',
  Item = 'items',
  Category = 'categories',
  Logout = 'logOut'
}

@Component({
  selector: 'app-root',
  imports: [CommonModule,CategoriesComponent, ItemsComponent, DialogComponent, QuickStartComponent, NzButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [InventoryService]
})

export class AppComponent implements OnInit {
  public title = 'Inventory App';
  public itemData: Item[] = [];
  public categoryData: any[]=[];
  public Views = Views; // Make the enum accessible in the template
  public currentView: Views = Views.Start;
  public showCategory= false;
  public showItem = false;
  public showDialog=false;
  public showQuickStart=false;
  public categoryData$: Observable<any>

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.categoryAdded$.subscribe(() => {
      // Refresh your categories or UI here
      this.getCategories();
    });
    this.inventoryService.categoryRemoved$.subscribe(()=>{
      this.getCategories();
    });
    this.inventoryService.itemAdded$.subscribe(()=>{
      this.getItems();
    });
    this.inventoryService.itemRemoved$.subscribe(()=>{
      this.getItems();
    });
  }

  public ngOnInit() {
    this.getItems();
    this.getCategories();
  }

  private getItems(){
    this.inventoryService.getItems().subscribe(
      (data) => {
        this.itemData = data;
      },
      (error) => {
        console.error('Error fetching inventory items:', error);
      }
    );
  }
  
  private getCategories(){
    this.inventoryService.getCategories().subscribe(
      (data) => {
        this.categoryData = data;        
      },
      (error) => {
        console.error('Error fetching inventory categories:', error);
      }
    );
  }

  public onViewChange(view: Views) {
    this.currentView = view;    
  }

  public onAddCategory(categoryToAdd: string){
    this.inventoryService.addCategory(categoryToAdd);
  }

  public onRemoveCategory(categoryToRemove: string){
    this.inventoryService.deleteCategory(categoryToRemove);
  };

  public onAddItem(itemToAdd:newItem){    
    this.inventoryService.addItem(itemToAdd);
  }

  public onRemoveItem(itemToRemove: string){
    this.inventoryService.deleteItem(itemToRemove);
  }

  public onAddBtnClick(){
    this.showDialog = true;
  }

  onDialogConfirmed(confirmed: boolean) {
    this.showDialog = false;
  }
}