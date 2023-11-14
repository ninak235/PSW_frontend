import { Component, OnInit } from '@angular/core';
import { AuthService } from './infrastructure/auth/auth.service';
import 'leaflet-routing-machine';
import { NotificationsService } from 'angular2-notifications';
import { User } from './infrastructure/auth/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Explorer';
  user: User;
  constructor(private authService: AuthService, private notifications: NotificationsService) {}

  ngOnInit(): void {
    this.checkIfUserExists();

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  private checkIfUserExists(): void {
    this.authService.checkIfUserExists();
  }
}
