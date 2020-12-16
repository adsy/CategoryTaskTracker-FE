import { Component, Input, OnInit } from "@angular/core";
import * as Chart from "chart.js";
import { TaskService } from "src/app/taskService.service";
import { CompletedTask } from "../../shared/completedTask.interface";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"],
})
export class GraphComponent implements OnInit {
  canvas: any;
  ctx: any;
  show: boolean = false;
  @Input("completedTasks") completedTasks: CompletedTask[] = [];
  dates = [];
  data = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.completedTasks = this.taskService.completedTasks;

    this.taskService.completedTaskSub.subscribe((completedTask) => {
      this.completedTasks.push(completedTask);
    });

    let previousDate;
    let currentDate;
    let timeArrayIndex = 0;

    this.completedTasks.map((task) => {
      // loop through each object in the array
      for (let key in task) {
        if (key === "date") {
          // set the currentDate of this object to its date value
          currentDate = task["date"];

          if (this.dates.includes(currentDate)) {
            timeArrayIndex = this.dates.indexOf(task[key]);
            ++this.data[timeArrayIndex];
            previousDate = task[key];
            return;
          }

          if (previousDate === undefined) {
            this.dates.push(task[key]);
            previousDate = task[key];
            this.data.push(1);
            return;
          }

          if (currentDate !== previousDate) {
            this.dates.push(task[key]);
            previousDate = task[key];
            this.data.push(1);
            ++timeArrayIndex;
            return;
          }
        }
      }
    });
    this.canvas = document.getElementById("myChart");
    this.ctx = this.canvas.getContext("2d");
    const myChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: this.dates,
        datasets: [
          {
            label: "Tasks completed",
            data: this.data,
            backgroundColor: [
              "red",
              "green",
              "blue",
              "purple",
              "teal",
              "peru",
              "white",
              "lime",
              "orange",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "#fc7753",
                fontSize: 14,
                lineWidth: 1,
                userCallback: function (label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label;
                  }
                },
              },
              gridLines: {
                color: "#fc7753",
              },
              drawBorder: true,
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "#fc7753",
                fontSize: 14,
              },
              gridLines: {
                color: "#fc7753",
              },
              drawTicks: true,
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: true,
        display: true,
      },
    });
  }
}
