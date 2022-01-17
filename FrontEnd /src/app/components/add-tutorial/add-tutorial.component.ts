import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  show: boolean = false;
  tempTitle: any;
  tempDescription: any;
  tempReturn: boolean = false;
  messageErr: string ='';
  messageErro: string ='';
  
  @Input() pattern: string | RegExp | undefined;

  constructor(private tutorialService: TutorialService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };

    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
        
      });
  }

  
  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }
//validations start
  buttonToggle(): void{
    if(this.tutorial.title !== "" && this.tutorial.description !== ""){ 
      this.show = this.show;

      this.messageErr = "";
    }
    else{
      this.show = !this.show;
      console.log("shiba");
      this.messageErr = "Fields cannot be empty!";
    }
  }
  disableButton(): boolean {
    this.buttonToggle();
      if((this.tutorial.title === "" || this.tutorial.description ==="") || this.findNumbers()){
        if(this.findNumbers()){
          this.messageErro = "Numbers are not allowed on the title!";
      }
      else{
        this.messageErro = "";
      }
        return true;
      }
      else{
        return false;
      }
    }

    findNumbers(): boolean {
      this.tempTitle = this.tutorial.title;
      for (const element of this.tempTitle){
        if(parseInt(element)){
          console.log(this.tempTitle);
          console.log(element, " is a number");
          this.tempReturn = true;
          
        }
        else {
          console.log("No numbers found");
          this.tempReturn = false;
          
        }
      }
        return this.tempReturn;
      
    }
  

}