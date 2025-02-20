import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() public newCategory = false;
  @Output() public addCategoryEvent = new EventEmitter<string>();
  public newItem=false;

  public addCategory(categoryName:string){
    this.addCategoryEvent.emit(categoryName);
  }

  public addItem(){
    //
  }
}
