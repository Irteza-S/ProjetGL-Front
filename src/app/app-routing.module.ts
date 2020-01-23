import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './list/list-ticket/tickets.component';
import { TicketFormComponent } from './form/form-ticket/ticket-form.component';
import { UserSessionComponent} from './user-session/user-session.component';
import { LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'list', component: TicketsComponent},
  { path: 'form', component: TicketFormComponent},
  { path: 'session', component: UserSessionComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
