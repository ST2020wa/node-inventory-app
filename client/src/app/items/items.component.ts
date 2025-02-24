import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input, Output } from '@angular/core';
import { Item } from '../inventory.service';

@Component({
  selector: 'app-items',
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  @Input() itemData:Item[]=[];
  @Output() itemToHandle = new EventEmitter<string>();

  public onItemClick($event: MouseEvent): void {    
    const target = $event.target as HTMLElement;
    const itemDetailsDiv = target.closest('.item-details') as HTMLElement;
    if (itemDetailsDiv) {
        const itemId = itemDetailsDiv.dataset['itemId'];
        this.itemToHandle.emit(itemId);
    }
  }
}
