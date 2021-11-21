import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const eventsModule = () => import('./events/events.module').then(x => x.EventsModule);

const routes: Routes = [
    { path: '', loadChildren: eventsModule },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
