import { Component } from '@angular/core';
import { Tourist } from '../model/tourist.model';
import { ClubService } from '../club.service';

@Component({
  selector: 'xp-club-members',
  templateUrl: './club-members.component.html',
  styleUrls: ['./club-members.component.css']
})
export class ClubMembersComponent {
  users: Tourist[] = [
    
  ];

  constructor(private service: ClubService){
    
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(){
    this.service.getMembers(2).subscribe({
      next: (result) => {
        // Assuming 'result' is an array of tourists
        this.users = result.results;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error loading tourists:', error);
      }
    });
  }

  removeUser(user: Tourist){
    console.log(user.id);
    this.service.removeMember(user.id, 2).subscribe({
      next: (_) => {
        console.log("Next");
      },
    });
  }
}
