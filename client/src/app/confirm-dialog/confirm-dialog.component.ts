import { CommonModule } from '@angular/common';
import { Component, TemplateRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  imports: [CommonModule]
})
export class ConfirmDialogComponent {
  private templateRef: TemplateRef<any>
  visible = false;

  @Output() confirmed = new EventEmitter<boolean>();

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  onConfirm() {
    this.confirmed.emit(true);
    this.hide();
  }

  onCancel() {
    this.confirmed.emit(false);
    this.hide();
  }
}