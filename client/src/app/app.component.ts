import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryService } from './inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [InventoryService]
})

export class AppComponent implements OnInit {
  title = 'client';
  inventoryData: any[] = [];
  currentView: string = 'item'; // Default view is 'item'

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getData().subscribe(
      (data) => {
        this.inventoryData = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching inventory data:', error);
      }
    );
  }  

  onViewChange(view: string) {
    this.currentView = view;
  }
}