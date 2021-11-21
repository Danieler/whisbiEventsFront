import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { InfoComponent } from "./info.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EventsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        InfoComponent

    ]
})
export class EventsModule { }
