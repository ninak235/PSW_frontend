import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { CompetitionServiceService } from '../competition-service.service';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Competition, Status } from '../model/competition.model';

@Component({
  selector: 'xp-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css'],
})
export class CreateCompetitionComponent implements OnInit {
  selectedDate = new FormControl(new Date());
  tourOptions: Tour[] = [];
  page: number = 1;
  pageSize: number = 5;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionServiceService,
    private tokenStorage: TokenStorage
  ) {}

  ngOnInit(): void {
    this.loadTourOptions();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    console.log(this.showForm);

    if (this.showForm) {
      this.selectedDate.setValue(new Date());
    }
  }

  loadTourOptions() {
    const userId = this.tokenStorage.getUserId();

    this.competitionService
      .getTourByGuide(userId, this.page, this.pageSize)
      .subscribe({
        next: (result: PagedResults<Tour>) => {
          this.tourOptions = result.results;

          console.log('Sadržaj result.results:', result.results);
        },
        error(err: any) {
          console.log(err);
        },
      });
  }

  competitionForm = new FormGroup({
    tours: new FormControl('', [Validators.required]),
    startDate: new FormControl(new Date()),
    duration: new FormControl(0, [Validators.required]),
  });

  addCompetition(): void {
    const competition: Competition = {
      tourId: this.competitionForm.value.tours as unknown as number,
      startDate: this.competitionForm.value.startDate as Date,
      duration: this.competitionForm.value.duration ?? 0,
      competitionApplies: [],
      status: Status.Open,
    };

    this.competitionService.addCompetition(competition).subscribe({
      next: () => {
        console.log(competition);
        this.competitionForm.reset();
      },
    });
  }
}
