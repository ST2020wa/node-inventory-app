import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../categories/categories.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Views } from '../app.component';

export type newItem = {
  name: string,
  fkCategory: number
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports: [NzSelectModule, FormsModule, CommonModule]
})
export class DialogComponent {
  @Input() visible = false; // Controls visibility
  @Input() title:string; // Customizable title
  @Input() currentView: Views;
  @Input() content = 'This is the dialog content.'; // Customizable content
  @Output() confirmed = new EventEmitter<boolean>(); // Emits true/false on OK/Cancel
  @Input() public categoryData: Category[] = [];
  @Input() public newCategory = false;
  @Output() public addCategoryEvent = new EventEmitter<string>();
  @Output() public addItemEvent = new EventEmitter<newItem>();
  
  public itemCategory: number;
  public Views: Views;
  public addItem = false;
  public addCategory = false;

  public ngOnInit(){
    if(this.currentView === Views.Item){
      this.addItem = true;
    }else if(this.currentView === Views.Category){
      this.addCategory = true;
    }
  }

  public ngOnDestroy(){
    this.addItem = false;
    this.addCategory = false;
  }


  public onConfirm() {
    if (this.addItem) {
      const itemInput = document.querySelector('input[name="name"]') as HTMLInputElement;
      if (itemInput) {
        this.onAddItem(itemInput);
      }
    } else if (this.currentView === Views.Category) {
      const categoryInput = document.querySelector('input[name="name"]') as HTMLInputElement;
      if (categoryInput) {
        this.onAddCategory(categoryInput.value);
      }
    }
    this.confirmed.emit(true);
    this.visible = false;
  }

  public onCancel() {
    this.confirmed.emit(false);
    this.visible = false;
  }

  private onAddCategory(categoryName:string){
    this.addCategoryEvent.emit(categoryName);
  }

  private onAddItem(itemInput: HTMLInputElement) {
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