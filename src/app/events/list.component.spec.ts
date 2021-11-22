import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AlertService, EventService} from "@app/_services";
import {of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const fakeEventService = jasmine.createSpyObj('EventService', {
    delete: of([{_id: '1'}]),
    getAll: of({data: [{_id: '1'}]}),
    update: of({data: [{_id: '1'}]}),
  });
  const fakeAlertService = jasmine.createSpyObj('AlertService', {
    success: undefined,
    error: undefined
  });


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ListComponent ],
      providers: [
        { provide: EventService, useValue: fakeEventService },
        { provide: AlertService, useValue: fakeAlertService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
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

  it('deleteEvent should call eventService.delete', () => {
    component.deleteEvent('1')
    expect(fakeEventService.delete).toHaveBeenCalled();
  });
  it('deleteEvent should remove an event', () => {
    component.deleteEvent('1')
    expect(component.events.length).toBe(0);
  });

  it('publishEvent should call eventService.update', () => {
    component.publishEvent('1')
    expect(fakeEventService.update).toHaveBeenCalled();
  });
  it('publishEvent should call alertService.success', () => {
    component.publishEvent('1')
    expect(fakeAlertService.success).toHaveBeenCalled();
  });
  it('publishEvent should call alertService.error on error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    fakeEventService.update.and.returnValue(throwError(errorResponse));
    component.publishEvent('1')
    expect(fakeAlertService.error).toHaveBeenCalled();
  });
});
