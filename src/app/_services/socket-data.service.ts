import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';
import { Observable } from 'rxjs';
import * as socketio from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketDataService {
  private baseUrl = 'http://localhost:8003';
  private socket;

  getData(): Observable<any[]> {
    this.socket = socketio.connect(this.baseUrl);
    const events = new Subject<string[]>();
    const eventsObservable = from(events);
    this.socket.on('events', (eventsArray: any[]) => {
      events.next(eventsArray);
    });
    return eventsObservable;
  }

  disconnect() {
    this.socket.disconnect();
  }
}
