import { Component, Input, OnInit } from "@angular/core";
import { CompletedTask } from "src/app/shared/completedTask.interface";
import { Task } from "src/app/shared/task.interface";
import { TaskService } from "src/app/taskService.service";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  count: number = 0;
  firstSec: number = 0;
  secondSec: number = 0;
  firstMin: number = 0;
  secondMin: number = 0;
  firstHour: number = 0;
  secondHour: number = 0;
  timerInterval;
  stopped = false;
  started = false;
  @Input("task") selectedTask: Task;

  ngOnInit(): void {}

  timerIntervalFunc() {
    return setInterval(() => {
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

  startTimer() {
    // if timer has already started and not been stopped, leave function.
    if (this.started && !this.stopped) {
      return;
    }
    // if timer has already started but has been stopped, restart the interval.
    if (this.stopped) {
      this.started = true;
      this.stopped = false;
      this.timerInterval = this.timerIntervalFunc();
      return;
    }
    this.started = true;
    this.timerInterval = this.timerIntervalFunc();
  }

  stopTimer() {
    if (!this.stopped) {
      clearInterval(this.timerInterval);
      this.stopped = true;
      return;
    }

    clearInterval(this.timerInterval);
    this.resetTimer();
    this.stopped = false;
    this.started = false;
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

      // add task into completed task db
      this.taskService
        .addCompletedTask({
          categoryID: this.selectedTask.categoryID,
          taskID: this.selectedTask._id,
          description: this.selectedTask.description,
          timeSpent: this.count,
          date: new Date().toLocaleDateString(),
        })
        .subscribe((response: CompletedTask) => {
          this.taskService.shareTime(this.count);
          this.taskService.shareNewCompletedTask(response);
        });

      // delete task from task db
      this.taskService
        .deleteTask(this.selectedTask._id)
        .subscribe((response) => {});

      // remove task from local task array to update interface
      this.taskService.tasks.splice(this.taskService.taskIndex, 1);

      // share completed task with graph component

      this.taskService.selectedTask = null;
      return;
    }
  }
}
