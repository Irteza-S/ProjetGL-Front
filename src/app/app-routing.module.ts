import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './list/list-ticket/tickets.component';
import { TicketFormComponent } from './form/form-ticket/ticket-form.component';
import { UserSessionComponent} from './user-session/user-session.component';
import { LoginComponent} from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGaurdService } from './services/login/auth-gaurd.service';
import { ListStaffComponent } from './list/list-staff/list-staff.component';
import { ListClientComponent } from './list/list-client/list-client.component';
import { StaffFormComponent } from './form/form-staff/form-staff.component';
import { SearchComponent } from './search/search/search.component';
import { GestionComponent } from './gestion/gestion/gestion.component';
import { StopwatchComponent } from './modal/stopwatch/stopwatch.component';
import { ClientFormComponent } from './form/form-client/form-client.component';
import { StatComponent } from './stat/stat.component';
import { AppSettingsFormComponent } from './form/app-settings-form/app-settings-form.component';



const routes: Routes = [
  { path: 'list-ticket', component: TicketsComponent, canActivate: [AuthGaurdService] },
  { path: 'form-ticket/:clientId', component: TicketFormComponent},
  { path: 'form-ticket/:clientId/:ticketId', component: TicketFormComponent},
  { path: 'session', component: UserSessionComponent},
  { path: 'form-staff', redirectTo: 'form-staff/'},
  { path: 'form-staff/:userId', component: StaffFormComponent},
  { path: 'form-client', redirectTo: 'form-client/' },
  { path: 'form-client/:clientId', component: ClientFormComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'list-staff', redirectTo: 'list-staff/'},
  { path: 'list-staff/:foo', component: ListStaffComponent},
  { path: 'list-client', redirectTo: 'list-client/'},
  { path: 'list-client/:foo', component: ListClientComponent},
  { path: 'search', component: SearchComponent},
  { path: 'gestion', component: GestionComponent},
  { path: 'chrono', component: StopwatchComponent},
  { path: 'stat', component: StatComponent},
  { path: 'form-settings/:userId', component: AppSettingsFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
