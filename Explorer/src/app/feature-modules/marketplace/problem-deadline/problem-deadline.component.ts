import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { Problem } from '../model/problem.model';

@Component({
  selector: 'xp-problem-deadline',
  templateUrl: './problem-deadline.component.html',
  styleUrls: ['./problem-deadline.component.css']
})
export class ProblemDeadlineComponent {
  constructor(private service: MarketplaceService) {}

  @Input() problem: Problem;
  @Output() problemUpdated = new EventEmitter<null>();
  //@Output() deadlineAdded = new EventEmitter<number>();

  selectedDate = new FormControl(new Date());
  showForm = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
    console.log(this.showForm)

    if (this.showForm) {
      this.selectedDate.setValue(new Date());
    }
  }

  addDeadline(): void {
    const selectedDateValue = this.selectedDate.value || new Date();


    const updatedProblem: Problem = {
      id: this.problem.id,
      category: this.problem.category || "",
      priority: this.problem.priority || "",
      description: this.problem.description || "",
      time: this.problem.time || "",
      idTourist: this.problem.idTourist || 0,
      idGuide: this.problem.idGuide || 0,
      isSolved: this.problem.isSolved || false,
      deadline: selectedDateValue
    };

    this.service.addDeadline(updatedProblem).subscribe({
      next: (_) => {
        this.problemUpdated.emit();
        //this.deadlineAdded.emit(updatedProblem.idGuide);
        this.showForm = false;
      }
    });
  }
}

