import { Component, OnInit } from '@angular/core';
import {  TutorialService } from 'src/app/services/tutorial.service'

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  tutorial: any;
  currentTutorial = null;
  currentIndex = -1;
  title='';

  constructor(private tutorialService:TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(){
    this.tutorialService.getAll()
    .subscribe(
      data =>{
        this.tutorial = data;
        console.log(data)
      },
      error =>{
        console.log(error);
      }
    );
  }

  refreshList(){
    this.retrieveTutorials();
    this.currentTutorial =null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial,index){
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(){
    this.tutorialService.deleteAll()
    .subscribe(
      response =>{
        console.log(response);
        this.retrieveTutorials();
      },
      error =>{
        console.log(error)
      }
    );
  }

  searchTitle(){
    this.tutorialService.findByTitle(this.title)
    .subscribe(
      data =>{
        this.tutorial = data;
        console.log(data)
      },
      error =>{
        console.log(error)
      }
    );
  }
}
