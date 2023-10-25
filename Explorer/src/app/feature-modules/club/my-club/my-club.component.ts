import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tourist } from '../model/tourist.model';
import { ClubInvitationDto } from '../model/club-invitation.model';
import { ClubService } from '../club.service';
import { ClubMembersComponent } from '../club-members/club-members.component';

@Component({
  selector: 'xp-my-club',
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.css']
})
export class MyClubComponent implements OnInit{
  // variables
  tourists: Tourist[] = [];
  

   invitation: ClubInvitationDto = {
    ClubInvitationId: 1,
    ClubId: 123,
    TouristId: 456,
    InvitationMessage: 'Hello, would you like to join our club?',
    InvitationStatus: 'SENT'
  };

  constructor(private service: ClubService){
    
  }
  ngOnInit(): void {
    this.loadTourists();
  }

  loadTourists() {
    this.service.getTourists(1).subscribe({
      next: (result) => {
        // Assuming 'result' is an array of tourists
        this.tourists = result.results;
        console.log(this.tourists);
      },
      error: (error) => {
        console.error('Error loading tourists:', error);
      }
    });
  }

  inviteTourist(tourist: any) {
    console.log(`Inviting ${tourist.name} to the club.`);
    this.service.sendInvite(this.invitation).subscribe({
      next: (_) => {
        console.log("Next");
      },
    })
  }
}
