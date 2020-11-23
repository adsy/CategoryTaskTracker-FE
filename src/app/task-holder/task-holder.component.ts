import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskHolderService } from '../taskHolderService.service';
import numeral from 'numeral';

@Component({
  selector: 'app-task-holder',
  templateUrl: './task-holder.component.html',
  styleUrls: ['./task-holder.component.css']
})
export class TaskHolderComponent implements OnInit {

  selectedTask;
  tasks=[];
  task = ''
  count = 0;
  firstSec = 0;
  secondSec = 0;
  firstMin = 0;
  secondMin = 0;
  firstHour = 0;
  secondHour = 0;

  timerInterval;


  constructor(private taskHolder:TaskHolderService,private router:Router, private activatedRoute:ActivatedRoute) { 
    this.selectedTask = activatedRoute.snapshot.url;
    this.tasks = taskHolder.tasks
  }

  ngOnInit(): void {
  }

  onStart(num:number){
    this.task = this.tasks[num];
    this.resetTimer();
  }

  startTimer(){
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
      
      if (this.firstMin < 9){
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

    },1000)
  }

  stopTimer(){
    clearInterval(this.timerInterval);
  }

  finishTimer(){
    clearInterval(this.timerInterval);
    this.firstSec = 0;
    this.secondSec = 0;
    this.firstMin = 0;
    this.secondMin = 0;
    this.firstHour = 0;
    this.secondHour = 0;
    this.count = 0;
    this.task = null;
  }

}
