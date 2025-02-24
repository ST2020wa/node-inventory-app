import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Category = {
  id: number,
  name: string
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Input() categoryData:Category[]=[];
  @Output() categoryToHandle = new EventEmitter<string>();

  public onCategoryNameClick($event: MouseEvent): void {    
    const target = $event.target as HTMLElement;
    if(target.textContent){
      this.categoryToHandle.emit(target.textContent);
    }
  }
}
