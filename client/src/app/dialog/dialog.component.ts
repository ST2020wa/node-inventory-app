import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Category } from '../categories/categories.component';

@Component({
  selector: 'app-dialog',
  imports: [NzSelectModule, FormsModule, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() public newCategory = false;
  @Output() public addCategoryEvent = new EventEmitter<string>();
  public newItem=false;
  @Input() public categoryData: Category[] = []; // Populate this from your service
  public selectedCategory: string = '';

  public addCategory(categoryName:string){
    this.addCategoryEvent.emit(categoryName);
  }

  public addItem(){
    //
  }
}
