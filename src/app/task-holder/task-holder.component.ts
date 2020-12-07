import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TaskHolderService } from "../taskHolderService.service";
import { FinishedTaskService } from "../finishedTasksService.service";
import { ModalDirective } from "angular-bootstrap-md";
import { CategoryService } from "../categoryService.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-task-holder",
  templateUrl: "./task-holder.component.html",
  styleUrls: ["./task-holder.component.css"],
})
export class TaskHolderComponent implements OnInit, OnDestroy {
  categoryID;
  category;
  tasks: string[] = [];
  task: string;
  taskIndex: number;
  count: number = 0;
  firstSec: number = 0;
  secondSec: number = 0;
  firstMin: number = 0;
  secondMin: number = 0;
  firstHour: number = 0;
  secondHour: number = 0;
  timerInterval;
  categorySubscription: Subscription;
  deleteSubscription: Subscription = null;

  @ViewChild("f", { static: false }) form;
  @ViewChild("taskModal") modal: ModalDirective;

  constructor(
    private taskHolder: TaskHolderService,
    private catService: CategoryService,
    private finishedTasks: FinishedTaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    this.task = null;
  }

  ngOnInit(): void {
    this.categoryID = this.activatedRoute.snapshot.params["path"];
    this.categorySubscription = this.catService
      .getSingleCategory(this.categoryID)
      .subscribe((response) => {
        this.category = response;
      });

    this.tasks = this.taskHolder.tasks;
  }

  onStart(num: number) {
    this.task = this.tasks[num];
    this.taskIndex = num;
    this.resetTimer();
  }

  onDelete(num: number) {
    let deletedTask = this.tasks.splice(num, 1);
    if (this.task === deletedTask[0]) this.task = null;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      ++this.count;

      if (this.firstSec < 9) {
        ++this.firstSec;
        return;
      }

      this.firstSec = 0;

      if (this.secondSec < 5) {
        ++this.secondSec;
        return;
      }

      this.secondSec = 0;

      if (this.firstMin < 9) {
        ++this.firstMin;
        return;
      }

      this.firstMin = 0;

      if (this.secondMin < 5) {
        ++this.secondMin;
        return;
      }

      this.secondMin = 0;

      if (this.firstHour < 9) {
        ++this.firstHour;
        return;
      }

      this.firstHour = 0;

      if (this.secondHour < 5) {
        ++this.secondHour;
        return;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.firstSec = 0;
    this.secondSec = 0;
    this.firstMin = 0;
    this.secondMin = 0;
    this.firstHour = 0;
    this.secondHour = 0;
  }

  finishTimer() {
    if (this.count > 0) {
      this.resetTimer();
      this.finishedTasks.finishedTasks.push(this.task);
      this.tasks.splice(this.taskIndex, 1);
      this.task = null;
      return;
    }
  }

  addTask() {
    this.modal.hide();
    this.taskHolder.tasks.push(this.form.value.task);
  }

  onCatDelete() {
    this.deleteSubscription = this.catService
      .deleteCategory(this.categoryID)
      .subscribe((response) => {
        console.log("deleted");
      });
    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 100);
  }
}
