import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryService } from './inventory.service';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ItemsComponent } from './items/items.component';
import { SettingsComponent } from './settings/settings.component';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,CategoriesComponent, ItemsComponent, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [InventoryService]
})

export class AppComponent implements OnInit {
  public title = 'Inventory App';
  public inventoryData: any[] = [];
  public categoryData: any[]=[];
  public currentView: string = 'item';
  public showCategory= false;
  public showDialog=false;

  constructor(private inventoryService: InventoryService) {}

  public ngOnInit() {
    this.inventoryService.getItems().subscribe(
      (data) => {
        this.inventoryData = data;
      },
      (error) => {
        console.error('Error fetching inventory items:', error);
      }
    );
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

  public onAddCategory(newCategoryName: string){
    this.inventoryService.addCategory(newCategoryName);
  }
}