import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './list/list-ticket/tickets.component';
import { TicketFormComponent } from './form/form-ticket/ticket-form.component';
import { UserSessionComponent} from './user-session/user-session.component';
import { LoginComponent} from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGaurdService } from './services/login/auth-gaurd.service';

const routes: Routes = [
  { path: 'list', component: TicketsComponent, canActivate: [AuthGaurdService] },
  { path: 'form', component: TicketFormComponent},
  { path: 'session', component: UserSessionComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
