import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { AdministrationService } from '../administration.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: Profile = {} as Profile;
  isEditMode: boolean = false;

  constructor(private service: AdministrationService, private auth: AuthService){}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(){
    this.auth.user$.subscribe((user) => {
      if (user.username) {
       
        
        const userId = user.id;

        
        this.service.getProfile(userId).subscribe({
          next: (data: Profile) => {
            this.userProfile.id = data.id;
            this.userProfile.userId = data.userId;
            this.userProfile.email = data.email;
            this.userProfile.name = data.name;
            this.userProfile.surname = data.surname;
            this.userProfile.profileImage = data.profileImage;
            this.userProfile.bio = data.bio;
            this.userProfile.quote = data.quote;
            //alert(JSON.stringify(this.userProfile));
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    });
    }

  toggleEditMode() {
    if(this.isEditMode == false)
    {
      this.isEditMode = !this.isEditMode;
    }
    else{
      this.service.updateProfile(this.userProfile, this.userProfile.userId).subscribe({
        next: (data: Profile) => {
          this.isEditMode = !this.isEditMode;
          this.loadProfileData();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
      
      //alert(JSON.stringify(this.userProfile));
    }
  } 
}