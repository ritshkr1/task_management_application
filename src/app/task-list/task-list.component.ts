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
import {MatInputModule} from '@angular/material/input';
// import {LiveAnnouncer} from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';




@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule,MatTableModule, MatSortModule, MatButtonModule, MatPaginatorModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, AfterViewInit {
  isDarkTheme: boolean = false;
  displayedColumns: string[] = [
    "title",
    "description",
    "status",
    "dueDate",
    "actions"];
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
      this.filteredTasks.data = [...tasks]
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

  openEditor(task: any) {
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
