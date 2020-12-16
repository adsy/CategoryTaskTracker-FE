import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";
import { CategoryService } from "./categoryService.service";
import { TaskHolderComponent } from "./task-holder/task-holder.component";
import { TaskService } from "./taskService.service";
import { HttpClientModule } from "@angular/common/http";
import { TimerComponent } from "./task-holder/timer/timer.component";
import { StatsComponent } from "./task-holder/stats/stats.component";
import { GraphComponent } from "./task-holder/graph/graph.component";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TaskHolderComponent,
    TimerComponent,
    StatsComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
  ],
  providers: [CategoryService, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
