import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-ag-grid-cell',
  standalone: true,
  imports: [MatButtonModule],
  template: `

<button mat-raised-button color="primary" class="m-2 w-25" (click)="onEdit()">Edit</button>
<button mat-raised-button color="warn" class="m-2 w-25" (click)="onDelete()">Delete</button>
  `,
})
export class AgGrigCellComponent implements ICellRendererAngularComp {
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  private task: any;

  agInit(params: ICellRendererParams): void {
    this.task = params.data; // Receive the row data
  }

  refresh(params: ICellRendererParams): boolean {
    this.task = params.data;
    return true;
  }

  onEdit() {
    console.log('ag grid',this.task)
    this.edit.emit(this.task); // Emit task for editing
  }

  onDelete() {
    this.delete.emit(this.task.id); // Emit task ID for deletion
  }
}
