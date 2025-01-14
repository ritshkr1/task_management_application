import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskService } from '../services/task.service';
import { MatTableModule } from '@angular/material/table'
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditorComponent } from '../shared/editor/editor.component';
import { DeleteModalComponent } from '../shared/delete-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, Sort, MatSortable, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
// import {LiveAnnouncer} from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeQuartz, Theme, } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  spacing: 15,
  accentColor: 'red',
  backgroundColor: 'rgb(249, 245, 227)',
  foregroundColor: 'rgb(126, 46, 132)',
  headerTextColor: 'rgb(204, 245, 172)',
  headerBackgroundColor: 'rgb(209, 64, 129)',
  oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
  headerColumnResizeHandleColor: 'rgb(126, 46, 132)',
});

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatTableModule, MatSortModule, MatButtonModule, MatPaginatorModule, MatDialogModule, MatSlideToggleModule, AgGridAngular,],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, AfterViewInit {
  isDarkTheme: boolean = false;
  public theme: Theme | "legacy" = myTheme;;
  displayedColumns: string[] = [
    "title",
    "description",
    "status",
    "dueDate",
    "actions"];

  rowData: Task[] = []; // ag-grid row data

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef<Task>[] = [
    { field: "title" },
    { field: "description", flex: 2 },
    { field: "status" },
    { field: "dueDate" },
    {
      headerName: 'Actions',
      cellRenderer: this.actionCellRenderer.bind(this), // Use a method to render actions
      width: 200,
    }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };
  // rowSelection ='multiple';
  pagination = true;
  paginationPageSize = 5;
  paginationPageSizeSelector = [5, 10, 20];
  taskList = new MatTableDataSource<Task>([]);
  filteredTasks = new MatTableDataSource<Task>([]);
  filter: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private taskService: TaskService, private dialog: MatDialog,
    // private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit() {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark-theme';
      this.toggleTheme();
    }
    // Fetch tasks from JSON when component is initialized
    this.taskService.fetchTasks().subscribe((tasks) => {
      this.taskService.setTasks(tasks);
    });

    // Subscribe to the task observable to keep the list updated
    this.taskService.tasks$.subscribe(tasks => {
      this.taskList.data = tasks;
      this.filteredTasks.data = [...tasks];
      this.rowData = [...this.filteredTasks.data]
      this.filteredTasks.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.filteredTasks.sort = this.sort;
    this.sort.sort(<MatSortable>{
      id: 'title',
      start: 'asc'
    }
    );
  }



  applyFilter() {
    const search = this.filter.toLowerCase();
    this.filteredTasks.data = this.taskList.data.filter(task => {
      // Reduce the object to a single concatenated string
      const concatenatedString = Object.values(task)
        .map(value => String(value).toLowerCase())
        .join('');
      return concatenatedString.includes(search);
    });
    this.rowData = [...this.filteredTasks.data]
  }

  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  // Renderer method for actions
  actionCellRenderer(params: any): HTMLElement {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '10px';

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.className = 'mat-flat-button mat-primary';
    editButton.addEventListener('click', () => this.openEditor(params.data));

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'mat-flat-button mat-warn';
    deleteButton.addEventListener('click', () => this.openDeleteModal(params.data));

    container.appendChild(editButton);
    container.appendChild(deleteButton);

    return container;
  }

  openEditor(task: any) {
    console.log(task)
    const dialogRef = this.dialog.open(EditorComponent, {
      width: '70rem',
      data: { task }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.taskService.editTask(result);
        } else {
          this.taskService.addTask(result);
        }
      }
    });
  }

  openDeleteModal(taskId: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        this.taskService.deleteTask(taskId);
      }
    });
  }

  toggleTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }

    // Save the user's preference
    localStorage.setItem('theme', this.isDarkTheme ? 'dark-theme' : 'light-theme');
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredTasks.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, 'tasks.xlsx');
  }

}
