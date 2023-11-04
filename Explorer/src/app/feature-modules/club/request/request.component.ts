import { Component } from '@angular/core';
import { ClubService } from '../club.service';
import { ClubRequestDto } from '../model/club-request.model';
import { Club } from '../model/club.model';

@Component({
  selector: 'xp-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  constructor(private service: ClubService){}
  clubs: Club[] = [];
   clubRequest: ClubRequestDto = {
    userId: 2,
    clubId: 3

    
  };
  ngOnInit(): void {
    this.loadClubs();
  }
  loadClubs(){
    this.service.getClubs(1).subscribe({
      next: (result) => {
        // Assuming 'result' is an array of tourists
        this.clubs = result.results;
        console.log(this.clubs);
      },
      error: (error) => {
        console.error('Error loading clubs:', error);
      }
    });
  }
  joinClub(club: any) {
    
    this.service.sendInvite(this.clubRequest).subscribe({
      next: (response: any) => {
        console.log("Next");
      },
    })
    console.log('Joined ' + club.name);
    // You can add your own logic to handle club joining
  }
}
