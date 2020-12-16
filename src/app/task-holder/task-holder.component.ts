import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TaskService } from "../taskService.service";
import { ModalDirective } from "angular-bootstrap-md";
import { CategoryService } from "../categoryService.service";
import { forkJoin, Observable, Subject, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { Task } from "../shared/task.interface";
import { Category } from "../shared/category.interface";
import { CompletedTask } from "../shared/completedTask.interface";

@Component({
  selector: "app-task-holder",
  templateUrl: "./task-holder.component.html",
  styleUrls: ["./task-holder.component.scss"],
})
export class TaskHolderComponent implements OnInit, OnDestroy {
  @ViewChild("taskForm", { static: false }) form;
  @ViewChild("taskModal") modal: ModalDirective;
  categoryID: string;
  category;
  selectedTask: Task;
  taskIndex: number;

  tasks: Task[] = [];

  completedTasks: CompletedTask[] = [];
  categorySubscription: Subscription;
  deleteSubscription: Subscription = null;
  taskSubscription: Subscription;

  loading: boolean;

  constructor(
    private taskHolder: TaskService,
    private catService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    this.selectedTask = null;
  }

  ngOnInit(): void {
    this.loading = true;
    // Grab the category ID from the path for future use
    this.categoryID = this.activatedRoute.snapshot.params["path"];
    this.categorySubscription = forkJoin([
      this.catService.getSingleCategory(this.categoryID),
      this.taskHolder.getTasks(this.categoryID),
    ])
      .pipe(
        map(([res1, res2]) => {
          this.category = res1;
          for (let item in res2) {
            this.tasks.push({ ...res2[item] });
          }
        })
      )
      .subscribe(() => {
        this.loading = false;
        this.taskHolder.tasks = this.tasks;
        this.taskHolder.completedTasks = this.completedTasks;
      });
  }

  onStart(task: Task) {
    this.selectedTask = task;
    this.taskHolder.taskIndex = this.taskIndex;
  }

  onAddTask() {
    this.modal.show();
  }

  addTask() {
    this.modal.hide();
    this.taskHolder
      .addTask({
        categoryID: this.categoryID,
        description: this.form.value.description,
      })
      .pipe(take(1))
      .subscribe((data: Task) => {
        this.tasks.push({
          ...data,
        });
      });

    this.form.reset();
  }

  deleteTask(i: number) {
    const taskID = this.tasks[i]._id;
    const deleteTaskSub = this.taskHolder.deleteTask(taskID).subscribe(() => {
      this.tasks.splice(i, 1);
      deleteTaskSub.unsubscribe();
    });
  }

  onCatDelete() {
    this.deleteSubscription = forkJoin([
      this.catService.deleteCategory(this.categoryID),
      this.taskHolder.deleteTasks(this.categoryID),
      this.taskHolder.deleteCompletedTasks(this.categoryID),
    ]).subscribe(() => {
      console.log("here");

      this.router.navigate(["../"]);
    });
  }
}
