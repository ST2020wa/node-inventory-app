import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { Item } from '../inventory.service';

@Component({
  selector: 'app-items',
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  @Input() itemData:Item[]=[];
}
