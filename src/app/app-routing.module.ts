import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';

const routes: Routes = [
  { path: 'list', component: TicketsComponent},
  { path: 'form', component: TicketFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
