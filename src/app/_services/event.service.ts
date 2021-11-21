import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Event } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class EventService {
  public event: Observable<Event>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  createEvent(event: Event) {
    return this.http.post(`${environment.apiUrl}/event`, event);
  }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/event`);
  }

  getById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/event/${id}`);
  }

  update(id, params) {
    return this.http.patch(`${environment.apiUrl}/event/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/event/${id}`);
  }
}
