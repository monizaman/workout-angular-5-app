import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StartComponent } from './start/start.component';
import { WorkoutComponent } from './workout/workout.component';
import { RouterModule, Routes } from '@angular/router';
import { SecondstominutePipe } from './secondstominute.pipe';
import { SafePipe } from './safe.pipe';
import { FinishComponent } from './finish/finish.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'workout', component: WorkoutComponent },
  { path: 'finish', component: FinishComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule, RouterModule.forRoot(routes)],
  declarations: [ AppComponent, HelloComponent, StartComponent, WorkoutComponent, SecondstominutePipe, SafePipe, FinishComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
