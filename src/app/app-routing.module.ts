import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskHolderComponent } from './task-holder/task-holder.component';

const appRoutes:Routes = [
  {path:'', component: HomepageComponent},
  {path:':path', component: TaskHolderComponent}
];


@NgModule({
  imports:[
    // useHash is used for when the project is hosted on web servers as they must be configured via the HTML History way - can use this method as a last resort.
    // RouterModule.forRoot(appRoutes, {useHash:true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
