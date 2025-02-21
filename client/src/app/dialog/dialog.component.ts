import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Category } from '../categories/categories.component';

export type newItem = {
  name: string,
  fkCategory: number
}

@Component({
  selector: 'app-dialog',
  imports: [NzSelectModule, FormsModule, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() public categoryData: Category[] = [];
  @Input() public newCategory = false;
  @Output() public addCategoryEvent = new EventEmitter<string>();
  @Output() public addItemEvent = new EventEmitter<newItem>();
  
  public itemCategory: number;

  public addCategory(categoryName:string){
    this.addCategoryEvent.emit(categoryName);
  }

  public addItem(itemName: string) {
    if (!this.itemCategory || !itemName) {
      console.error('Both category and item name are required');
      return;
    }
    this.addItemEvent.emit({
      fkCategory: this.itemCategory,
      name: itemName
    });
    this.itemCategory = 0;
  }
}
