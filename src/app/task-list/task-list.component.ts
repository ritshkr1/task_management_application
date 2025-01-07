import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskService } from '../services/task.service';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = [
    "title",
    "description",
    "status",
    "dueDate"];
  taskList: Task[] = []
  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.taskList = data;
      console.log(this.taskList)
    })
  }

}
