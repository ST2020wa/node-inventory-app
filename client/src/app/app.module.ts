import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    imports: [
      BrowserModule,
      CommonModule
    ],
    providers: [provideHttpClient()],  // Configure provideHttpClient here
  })
  export class AppModule { }