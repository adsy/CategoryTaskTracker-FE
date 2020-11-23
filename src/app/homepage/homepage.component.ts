import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { CategoryService } from '../categoryService.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private catWorker:CategoryService){
    this.categories = catWorker.categories
  }

  @ViewChild('f',{static:false}) form;
  @ViewChild('basicModal') modal: ModalDirective;
  categories=[]
  catCount;


  ngOnInit(): void {
  }

  addCategory(){
    this.modal.hide();

    if (this.catWorker.categories.length % 2 === 0){
      this.catWorker.categories.push(this.form.value.catName);
      this.form.reset();
      return;
    }
    
    this.catWorker.categories.push(this.form.value.catName)
    this.form.reset();
    
  }


}
