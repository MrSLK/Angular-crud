import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentRecipe: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';
  messageUpdate="";

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRecipe(this.route.snapshot.params["id"]);
    }
  }

  getRecipe(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRecipe = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentRecipe.title,
      description: this.currentRecipe.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentRecipe.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentRecipe.published = status;
          this.message = res.message ? 'The status was updated successfully!' :res.message;
        },
        error: (e) => console.error(e)
      });
  }

  updateRecipe(): void {
    this.message = '';

      if(this.currentRecipe.title && this.currentRecipe.description !== ""){
        this.tutorialService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? 'This recipe was updated successfully!' : res.message;
        },
        error: (e) => console.error(e)
      });

      alert('Recipes updated successfully')
      }
      else{
        
        this.messageUpdate = "fields cannot be empty!!";
      }
      }
    

  deleteRecipe(): void {
    alert("Are you sure you want to delete this recipe?");
    this.tutorialService.delete(this.currentRecipe.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/recipes']);
          alert('Recipe deleted successfully')
        },
        error: (e) => console.error(e)
      });
  }

}