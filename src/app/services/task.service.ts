import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private taskSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.taskSubject.asObservable();

  private apiUrl = 'assets/task.json'; // Path to your JSON file in the assets folder

  constructor(private http: HttpClient) {}

  // Fetch tasks from the JSON file
  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Set tasks after fetching
  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.taskSubject.next(this.tasks);
  }

  // Add a new task
  addTask(task: Task) {
    task.id = this.tasks.length + 1; // Simple id generation logic
    this.tasks.push(task);
    this.taskSubject.next(this.tasks);
  }

  // Edit an existing task
  editTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.taskSubject.next(this.tasks);
    }
  }

  // Delete a task
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.taskSubject.next(this.tasks);
  }
}
