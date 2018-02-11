import { Component, OnInit } from '@angular/core';
import { EXERCISES } from '../mock-exercise';
import { REST } from '../mock-rest';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router'


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  sum: number
  totalTime: number;
  name:string = "7minWorkout";
  title:string =  "7 Minute Workout";
  exercises = EXERCISES;
  restExercise = REST;
  currentExerciseIndex = -1;
  exerciseIntervalObservable:any;
  currentExercise;
  currentExerciseDuration:number = 0;
  workoutPaused: boolean;
  observabletime;


  constructor(private router: Router) {
      
  }


    startWorkout(){
      this.startExercise(this.exercises[0]);
    }
    startExercise(exercisePlan) {
          this.currentExercise = exercisePlan;
          this.currentExerciseDuration = 0;
          if (exercisePlan.name != 'rest') {
            this.currentExerciseIndex++;  
          }
        this.exerciseIntervalObservable = this.startExerciseTimeTracking();
      }

      startExerciseTimeTracking() {
        this.observabletime = Observable.interval(1000).take(this.currentExercise.duration)
          .subscribe((data) => {
              this.totalTime--;
              this.currentExerciseDuration++;
              if(this.currentExerciseDuration  == this.currentExercise.duration){
                  var next = this.getNextExercise(this.currentExercise);
                  if (next) {
                    this.startExercise(next);
                  }
                  else{
                    this.router.navigate(['/finish']);
                  }
              } 
            });
          return this.observabletime;
      }

      getNextExercise(currentExercisePlan) {
          var nextExercise = null;
          if (currentExercisePlan === this.restExercise) {
              nextExercise = this.exercises[this.currentExerciseIndex + 1];
              console.log(JSON.stringify(nextExercise));
              console.log("exercise");
          }
          else {
              if (this.currentExerciseIndex < this.exercises.length - 1) {
                  nextExercise = this.restExercise;
                  console.log("rest");
              }
          }
          return nextExercise;
      };

      pauseWorkout () {
          this.exerciseIntervalObservable.unsubscribe();
          this.workoutPaused = true;
      };

      resumeWorkout() {
          this.exerciseIntervalObservable = this.startExerciseTimeTracking();
          this.workoutPaused = false;
      };

      pauseResumeToggle() {
          if (this.workoutPaused) {
              this.resumeWorkout();
          }
          else {
              this.pauseWorkout();
          }
      }

    ngOnInit() {
    this.totalWorkoutDuration();
    this.startWorkout();
  }

  totalWorkoutDuration () {
    if (this.exercises.length == 0) return 0;
      var total = 0;
      for(let exercise of this.exercises){
          total = total + exercise.duration;
      }
    this.totalTime = 10 * (this.exercises.length - 1) + total;
  }

}
