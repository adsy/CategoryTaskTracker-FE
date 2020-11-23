import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './categoryService.service';
import { TaskHolderComponent } from './task-holder/task-holder.component';
import { TaskHolderService } from './taskHolderService.service';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TaskHolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    
  ],
  providers: [CategoryService,TaskHolderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
