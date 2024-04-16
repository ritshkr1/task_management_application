import { Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [{path:"add-task",component:AddTaskComponent},{path:"edit-task",component:EditTaskComponent},{path:"",component:TaskListComponent},];
