import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditComponent } from './add-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AlertService, EventService} from "@app/_services";
import {of, throwError} from "rxjs";
import { ReactiveFormsModule } from '@angular/forms';



describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;
  const fakeEventService = jasmine.createSpyObj('EventService', {
    delete: of([{_id: '1'}]),
    getAll: of({data: [{_id: '1'}]}),
    update: of({data: [{_id: '1'}]}),
    createEvent: of({data: [{_id: '1'}]})
  });
  const fakeAlertService = jasmine.createSpyObj('AlertService', {
    success: undefined,
    error: undefined
  });


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ AddEditComponent ],
      providers: [
        { provide: EventService, useValue: fakeEventService },
        { provide: AlertService, useValue: fakeAlertService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(
    async(() => {
      fakeEventService.update.calls.reset();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createEvent should call eventService.createEvent', () => {
    component.createEvent()
    expect(fakeEventService.createEvent).toHaveBeenCalled();
  });
  it('updateEvent should call eventService.updateEvent', () => {
    component.updateEvent()
    expect(fakeEventService.update).toHaveBeenCalled();
  });
});
