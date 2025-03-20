import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
    selector: 'app-root',
    imports: [TaskListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task_management_application';
}
