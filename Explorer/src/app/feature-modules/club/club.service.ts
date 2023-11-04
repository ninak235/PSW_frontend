import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';
import { ClubRequestDto } from './model/club-request.model';
import { Club } from './model/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http: HttpClient) { }

  sendInvite(request: ClubRequestDto): Observable<ClubRequestDto> {
    return this.http.post<ClubRequestDto>(`${environment.apiHost}tourist/request`, request);
  }
  
  getClubs(userId: number): Observable<PagedResults<Club>>{
    return this.http.get<PagedResults<Club>>(`${environment.apiHost}club/club/${userId}`);
  }
}
