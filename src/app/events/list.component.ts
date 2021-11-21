import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {AccountService, AlertService, EventService} from '@app/_services';
import {EStatus, User} from "../_models";

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    events = null;
    user: User;

    constructor(
      private eventService: EventService,
      private alertService: AlertService,
      private accountService: AccountService
    ) {
      this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.eventService.getAll()
            .pipe(first())
            .subscribe(response => {
              this.events = response.data
            });
    }

    deleteEvent(id: string) {
        const event = this.events.find(x => x._id === id);
        event.isDeleting = true;
        this.eventService.delete(id)
            .pipe(first())
            .subscribe(() => this.events = this.events.filter(x => x._id !== id));
    }
    findEventIndex(param, value) {
      return this.events.findIndex(event => event[param] === value);
    }
    publishEvent(id: string) {
      this.eventService.update(id, { state: EStatus.Public})
        .pipe(first())
        .subscribe({
          next: (x: any) => {
            const updatedEventIndex = this.findEventIndex('_id', x.data._id);
            this.events[updatedEventIndex] = x.data;
            this.alertService.success('Publish successful', { keepAfterRouteChange: true });
          },
          error: error => {
            this.alertService.error(error);
          }
        });
    }
}
