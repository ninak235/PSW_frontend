import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/infrastructure/analytics/google-analytics.service';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

  ngOnInit(): void {
    this.googleAnalyticsService.sendPageView(window.location.pathname);
  }
  
}
