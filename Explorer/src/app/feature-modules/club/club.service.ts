import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tourist } from './model/tourist.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { ClubInvitationDto } from './model/club-invitation.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) { }

  getTourists(clubId: number): Observable<PagedResults<Tourist>> {
    return this.http.get<PagedResults<Tourist>>(`${environment.apiHost}tourist/clubInvitation/${clubId}`);
  }

  sendInvite(invitation: ClubInvitationDto): Observable<ClubInvitationDto> {
    return this.http.post<ClubInvitationDto>(`${environment.apiHost}tourist/clubInvitation`, invitation);
  }

  getMembers(clubId: number): Observable<PagedResults<Tourist>>{
    return this.http.get<PagedResults<Tourist>>(`${environment.apiHost}tourist/club/clubMember/${clubId}`)
  }

  removeMember(userId: number, clubId: number): Observable<any> {
    return this.http.delete(`${environment.apiHost}tourist/club/clubMember/${userId}/${clubId}`);
  }
  


}
