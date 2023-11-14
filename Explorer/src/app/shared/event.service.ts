import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private deadlineAddedSubject = new Subject<number>();

  deadlineAdded$ = this.deadlineAddedSubject.asObservable();

  emitDeadlineAdded(id: number) {
    this.deadlineAddedSubject.next(id);
  }
}
