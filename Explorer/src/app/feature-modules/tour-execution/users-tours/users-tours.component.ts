import { Component } from '@angular/core';
import { TourExecutionService } from '../tour-execution.service';
import { Tour } from '../model/tourExecution.model';

@Component({
  selector: 'xp-users-tours',
  templateUrl: './users-tours.component.html',
  styleUrls: ['./users-tours.component.css']
})
export class UsersToursComponent {
  purchasedTours: Tour[] = [];
  constructor(private service: TourExecutionService) {}
  ngOnInit(): void {
    //this.loadPurchasedTours(1); // Replace 123 with the actual touristId
    this.getTourExecutionByUser(1);
    this.createTourExecution(1, 1, 11.1, 11.1);
  }

  // loadPurchasedTours(touristId: number): void {
  //   this.service.getPurchasedTours(touristId).subscribe(
  //     (purchasedTours) => {
  //       // Handle the returned TourDTO array here
  //       this.purchasedTours = Array.from(purchasedTours.values);
  //       console.log(purchasedTours);
  //     },
  //     (error) => {
  //       // Handle error, e.g., show an error message
  //       console.error('Error loading purchased tours', error);
  //     }
  //   );
  // }

  getTourExecutionByUser(userId: number){
    this.service.getPurchasedTours(userId).subscribe(
      (result) => {
        this.purchasedTours = result.results;
        console.log(result);
        console.log(this.purchasedTours); 
      },
      (error) => {
        console.error('Error fetching TourExecution', error);
      }
    );
  }

  createTourExecution(userId: number, tourId: number, longitude: number, latitude: number): void {
    this.service.createTourExecution(userId, tourId, longitude, latitude);
  }
}
