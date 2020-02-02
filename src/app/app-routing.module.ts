import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './list/list-ticket/tickets.component';
import { TicketFormComponent } from './form/form-ticket/ticket-form.component';
import { UserSessionComponent} from './user-session/user-session.component';
import { LoginComponent} from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGaurdService } from './services/login/auth-gaurd.service';
import { ListStaffComponent } from './list/list-staff/list-staff.component';

const routes: Routes = [
  { path: 'list', component: TicketsComponent, canActivate: [AuthGaurdService] },
  { path: 'form', redirectTo: 'form/'},
  { path: 'form/:formType', component: TicketFormComponent},
  { path: 'session', component: UserSessionComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'list-staff', component: ListStaffComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
