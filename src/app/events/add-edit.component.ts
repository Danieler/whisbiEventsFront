import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common'
import { EventService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.form = this.formBuilder.group({
            headline: ['', Validators.required],
            description: ['', Validators.required],
            startDate: ['', Validators.required],
            location: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.eventService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                  let formData = {
                    startDate: new Date(x?.data?.startDate).toISOString().slice(0, 16),
                    headline: x?.data?.headline,
                    description: x?.data?.description,
                    location: x?.data?.location
                  }
                  this.form.patchValue(formData)
                });
        }
    }

    // convenience getter for easy access to form fields
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
        if (this.isAddMode) {
            this.createEvent();
        } else {
            this.updateEvent();
        }
    }

     createEvent() {
        this.eventService.createEvent(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Event added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

     updateEvent() {
        this.eventService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
