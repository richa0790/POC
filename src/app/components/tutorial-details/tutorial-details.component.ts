import { Component, OnInit } from '@angular/core';
import {TutorialService } from 'src/app/services/tutorial.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ViewFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  currentTutorial = null;
  message ='';

  constructor(
    private tutorialService:TutorialService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.message='';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id){
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data)
        },
        error =>{
          console.log(error)
        }
      );
  }

  updatePublished(status){
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.tutorialService.update(this.currentTutorial.id, data)
    .subscribe(response =>{
      this.currentTutorial.published = status;
      console.log(response)
    },
    error => {
      console.log(error)
    });
  }

  updateTutorial(){
    this.tutorialService.delete(this.currentTutorial.id)
    .subscribe(
      response =>{
        console.log(response);
        this.router.navigate(['/tutorials'])
      },
      error =>{
        console.log(error)
      }
    );
  }

}
