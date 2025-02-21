import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryService, Item } from './inventory.service';
import { CommonModule } from '@angular/common';
import { CategoriesComponent, Category } from './categories/categories.component';
import { ItemsComponent } from './items/items.component';
import { SettingsComponent } from './settings/settings.component';
import { DialogComponent, newItem } from './dialog/dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,CategoriesComponent, ItemsComponent, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [InventoryService]
})

export class AppComponent implements OnInit {
  public title = 'Inventory App';
  public itemData: Item[] = [];
  public categoryData: any[]=[];
  public currentView: string = 'item';
  public showCategory= false;
  public showDialog=false;
  public categoryData$: Observable<any>;

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.categoryAdded$.subscribe(() => {
      // Refresh your categories or UI here
      this.getCategories();
    });
    this.inventoryService.categoryRemoved$.subscribe(()=>{
      this.getCategories();
    })
  }

  public ngOnInit() {
    this.inventoryService.getItems().subscribe(
      (data) => {
        this.itemData = data;
      },
      (error) => {
        console.error('Error fetching inventory items:', error);
      }
    );
    this.getCategories();
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

  public onViewChange(view: string) {
    this.currentView = view;
  }

  public onAddCategory(categoryToAdd: string){
    this.inventoryService.addCategory(categoryToAdd);
  }

  public onRemoveCategory(categoryToRemove: string){
    this.inventoryService.deleteCategory(categoryToRemove);
  }

  public onAddItem(itemToAdd:newItem){
    this.inventoryService.addItem(itemToAdd);
  }
}