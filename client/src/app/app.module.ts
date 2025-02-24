import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      NzIconModule
    ],
    providers: [provideHttpClient()],  // Configure provideHttpClient here
  })
  export class AppModule { }