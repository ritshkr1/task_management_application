import { Component } from '@angular/core';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-delete-modal',
    imports: [MatDialogModule, MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule],
    template: `<div mat-dialog-title class="text-center">Delete Task</div>
  <mat-dialog-content>
    <div class="d-flex justify-content-center">
      <p>Are you sure you want to delete this task?</p>
    </div>
  </mat-dialog-content>
  <mat-dialog-actions class="text-center" [align]="'end'">
    <button mat-button class="btn btn-secondary" (click)="onCancel()">Cancel</button>
    <button mat-raised-button color="warn" class="btn btn-danger" (click)="onDelete()">Delete</button>
  </mat-dialog-actions>
  `
})
export class DeleteModalComponent {
  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>) { }

  onCancel(): void {
    this.dialogRef.close(); // Closes the modal without doing anything
  }

  onDelete(): void {
    // Logic to delete the task will go here
    this.dialogRef.close('deleted'); // Close with a response, indicating task was deleted
  }
}
