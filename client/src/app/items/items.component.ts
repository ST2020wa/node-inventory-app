import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Injectable,Input, Output } from '@angular/core';
import { Item } from '../inventory.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-items',
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})

export class ItemsComponent {
  @Input() itemData:Item[]=[];
  @Output() itemToHandle = new EventEmitter<string>();
  public showConfirmDialog = false;

  public onItemClick($event: MouseEvent): void {   
    this.showConfirmDialog = true;
    const target = $event.target as HTMLElement;
    const itemDetailsDiv = target.closest('.item-details') as HTMLElement;
    if (itemDetailsDiv) {
        const itemId = itemDetailsDiv.dataset['itemId'];
        this.itemToHandle.emit(itemId);
    }
  }
}
