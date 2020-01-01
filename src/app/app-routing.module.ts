import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { UserSessionComponent} from'./user-session/user-session.component';

const routes: Routes = [
  { path: 'list', component: TicketsComponent},
  { path: 'form', component: TicketFormComponent},
  { path: 'session', component: UserSessionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
