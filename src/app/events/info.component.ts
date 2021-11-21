import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common'
import { EventService, AlertService } from '@app/_services';
import { Event } from '@app/_models';

@Component({ templateUrl: 'info.component.html' })
export class InfoComponent implements OnInit {
  form: FormGroup;
  id: string;
  event: Event;
  submitted = false;
  loading = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.eventService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.event = x.data;
        });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.subscribeEvent();
  }
  private subscribeEvent() {
    this.eventService.suscribe(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Subscription successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
