import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  user: User;
  private deadlineAddedSubscription: Subscription;
  
  constructor(private notifications: NotificationsService, private router: Router, private probService: MarketplaceService, private authService: AuthService, private eventService: EventService) {}
 
  //OBRISATI
  ngOnChanges(changes: SimpleChanges): void {
     this.deadlineAddedSubscription = this.eventService.deadlineAdded$.subscribe((id) => {
      this.handleDeadlineAdded(id);
    });
  }
   

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    this.deadlineAddedSubscription = this.eventService.deadlineAdded$.subscribe((id) => {
      this.handleDeadlineAdded(id);
    });
    this.showNotification();
  }

  handleDeadlineAdded(id: number) {
    console.log("stigao dovde");
    if (this.user.id == id) {
      this.notifications.info('Zadat deadline!', 'Administrator je dodao rok na vasu turu!', {
            timeOut: 2500,
            showProgressBar: true,
            clickToClose: true
          });
    }
  }


  showNotification(): void {
    this.probService.isThereUnreadMessage(this.user.id || 0).subscribe(
      (idProblem: number) => {
        if (idProblem != 0) {
            const toast = this.notifications.info('Nove poruke u cetu!', 'Udjite da biste videli celu prepisku o problemu!', {
            timeOut: 2500,
            showProgressBar: true,
            clickToClose: true
          });

            toast.click?.subscribe(() => {
            this.router.navigate(['problems']);
          })
        }
      }
    )
  }

   notifyAboutDeadline(id: number): void{
    if(this.user.id == id)
    this.notifications.info('Zadat vam je novi deadline kao autoru!', 'Udjite da biste videli zadati deadline!', {
            timeOut: 2500,
            showProgressBar: true,
            clickToClose: true
          });

  }
}
