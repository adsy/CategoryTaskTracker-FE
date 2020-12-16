import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "./shared/task.interface";
import { CompletedTask } from "./shared/completedTask.interface";

@Injectable()
export class TaskService implements OnInit {
  tasks: Task[] = [];
  completedTasks: CompletedTask[] = [];
  categoryID: string;
  selectedTask: Task;
  taskIndex: number;
  totalTime: number;
  timeSubject: Subject<number> = new Subject<number>();
  completedTaskSub: Subject<CompletedTask> = new Subject<CompletedTask>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getTasks(id: string) {
    this.categoryID = id;
    return this.http.get(`http://localhost:3000/api/categories/${id}/tasks`);
  }

  addTask(task: Task) {
    return this.http.post(
      `http://localhost:3000/api/categories/${this.categoryID}/tasks`,
      task
    );
  }

  deleteTask(taskID: string) {
    return this.http.delete(
      `http://localhost:3000/api/categories/${this.categoryID}/tasks/${taskID}`
    );
  }

  deleteTasks(id: string) {
    return this.http.delete(`http://localhost:3000/api/categories/${id}/tasks`);
  }

  getCompletedTasks(id: string) {
    return this.http.get(
      `http://localhost:3000/api/categories/${id}/completedTasks`
    );
  }

  addCompletedTask(task: CompletedTask) {
    return this.http.post(
      `http://localhost:3000/api/categories/${this.categoryID}/completedTasks`,
      task
    );
  }

  deleteCompletedTasks(id: string): any {
    return this.http.delete(
      `http://localhost:3000/api/categories/${id}/completedTasks`
    );
  }

  shareTime(time: number) {
    this.timeSubject.next(time);
  }

  shareNewCompletedTask(cTask: CompletedTask) {
    this.completedTaskSub.next(cTask);
  }
}
