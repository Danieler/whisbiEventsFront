import {Component, OnDestroy, OnInit} from '@angular/core';

import {AccountService, AlertService} from './_services';
import { User } from './_models';
import { SocketDataService } from "@app/_services/socket-data.service";

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit, OnDestroy {
    user: User;

    constructor(
      private accountService: AccountService,
      private alertService: AlertService,
      private socketService: SocketDataService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
        this.socketService.disconnect();
    }
    ngOnInit() {
      this.socketService.getData().subscribe((events) => {
        const userEvents = events.filter((event) => event.subscribers.includes(this.user._id));
        for (const event of userEvents) {
          this.alertService.success(`Event ${event.headline} going to happen soon`, { keepAfterRouteChange: true });
        }
      });
    }
    ngOnDestroy() {
      this.socketService.disconnect();
    }
}
