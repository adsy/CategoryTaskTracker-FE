import { Component, Input, OnInit } from "@angular/core";
import { CompletedTask } from "src/app/shared/completedTask.interface";
import { Task } from "src/app/shared/task.interface";
import { TaskService } from "src/app/taskService.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.css"],
})
export class StatsComponent implements OnInit {
  @Input("time") totalTime: number = 0;
  @Input("count") totalTasks: number = 0;
  formattedTime: string;
  loading: boolean;
  completedTasks: CompletedTask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loading = true;
    this.completedTasks = this.taskService.completedTasks;

    // Create subscription that listens for tasks being completed
    this.taskService.timeSubject.subscribe((totalTime) => {
      // add time recent completed task and increment total tasks completed
      ++this.totalTasks;
      this.totalTime += totalTime;
      // convert total to to 00:00:00 format
      this.convertTotalTime();
    });

    // Create subscription that counts total time and total tasks on initilisation
    this.taskService
      .getCompletedTasks(this.taskService.categoryID)
      .subscribe((response) => {
        // loop through items in object
        for (let item in response) {
          // add total time of all objects and count total tasks
          this.totalTime += response[item]["timeSpent"];
          ++this.totalTasks;
          // add completedTasks to local array for component
          this.completedTasks.push({ ...response[item] });
          // convert total to to 00:00:00 format
          this.convertTotalTime();
        }
      });
  }

  convertTotalTime() {
    this.formattedTime = new Date(this.totalTime * 1000)
      .toISOString()
      .substr(11, 8);
    this.loading = false;
  }
}
