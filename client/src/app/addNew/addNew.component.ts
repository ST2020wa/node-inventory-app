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
  selector: 'app-addNew',
  imports: [NzSelectModule, FormsModule, CommonModule],
  templateUrl: './addNew.component.html',
  styleUrl: './addNew.component.css'
})
export class AddNewComponent {
  @Input() public categoryData: Category[] = [];
  @Input() public newCategory = false;
  @Output() public addCategoryEvent = new EventEmitter<string>();
  @Output() public addItemEvent = new EventEmitter<newItem>();
  
  public itemCategory: number;

  public addCategory(categoryName:string){
    this.addCategoryEvent.emit(categoryName);
  }

  public addItem(itemInput: HTMLInputElement) {
    let itemName = itemInput.value;
    if (!this.itemCategory || !itemName) {
      console.error('Both category and item name are required');
      return;
    }
    this.addItemEvent.emit({
      fkCategory: this.itemCategory,
      name: itemName
    });
    this.itemCategory = undefined;
    itemInput.value = '';
  }
}
