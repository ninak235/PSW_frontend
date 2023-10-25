import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyClubComponent } from './my-club/my-club.component';
import { ClubMembersComponent } from './club-members/club-members.component';



@NgModule({
  declarations: [
    MyClubComponent,
    ClubMembersComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MyClubComponent
  ]
})
export class ClubModule { }
