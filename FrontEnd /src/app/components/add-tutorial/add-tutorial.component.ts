import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';


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
    characErr: string ='';
    result: boolean = false;
    iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_"; 
    
    @Input() pattern: string | RegExp | undefined;

    constructor(private tutorialService: TutorialService) { }

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
      
        if((this.tutorial.title === "" || this.tutorial.description ==="") || (this.findNumbers(this.tutorial.title) || this.findNumbers(this.tutorial.description)) || (this.findCharacters(this.tutorial.description) || this.findCharacters(this.tutorial.title)) ){
          if(this.findNumbers(this.tutorial.title) || this.findNumbers(this.tutorial.description)){
            this.messageErro = "Numbers are not allowed on the title!";
            
            }
          else{
            this.messageErro = "";
            
          }
          if(this.findCharacters(this.tutorial.title) || this.findCharacters(this.tutorial.description)){
            console.log("Characters are not allowed!");
            this.characErr = "Characters are not allowed!";
          }
          else{
            this.characErr = "";
          }

          return true;
        }
        else{
          return false;
        }
        
      }

      clearField(): void {
        this.tutorial.title ="";
        this.tutorial.description = "";
      }

      findNumbers(temp: any): boolean {
        
        for (const element of temp){
          if(parseInt(element)){
            console.log(temp);
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

      findCharacters(temp: any): boolean {
        for (var i = 0; i < temp.length; i++){
          if (this.iChars.indexOf(temp.charAt(i)) != -1){    
      
           console.log("Your string has special characters. \nThese are not allowed.");
           this.result = !this.result;
          }
          else {
            this.result = this.result;
          }

        }
        return this.result;
      }
    }