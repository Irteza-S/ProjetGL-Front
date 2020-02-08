import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TicketsComponent } from './list/list-ticket/tickets.component';
import { AppRoutingModule } from './app-routing.module';
import { TicketFormComponent } from './form/form-ticket/ticket-form.component';
import { CookieService } from 'ngx-cookie-service';
import { UserSessionComponent } from './user-session/user-session.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule,
MatPaginatorModule, MatTabsModule, MatExpansionModule, MatDialogModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './auth/login/login.component';
import { CustomMaterialModule } from './material.module';
import { TicketAPIService } from './services/api/ticket-api.service';
import { HttpModule } from '@angular/http';
import { LoginAPIService } from './services/login/login-api.service';
import { LogoutComponent } from './auth/logout/logout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListStaffComponent } from './list/list-staff/list-staff.component';
import { ListClientComponent } from './list/list-client/list-client.component';
import { StaffFormComponent } from './form/form-staff/form-staff.component';
import { SearchComponent } from './search/search/search.component';
import { MatListModule } from '@angular/material/list';
import { GestionComponent } from './gestion/gestion/gestion.component';
import { GestionCardComponent } from './gestion/gestion-card/gestion-card.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { StopwatchComponent } from './modal/stopwatch/stopwatch.component';
import { DeleteModalComponent } from './list/list-staff/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketFormComponent,
    UserSessionComponent,
    LoginComponent,
    LogoutComponent,
    ListStaffComponent,
    ListClientComponent,
    StaffFormComponent,
    SearchComponent,
    GestionComponent,
    GestionCardComponent,
    StopwatchComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    CustomMaterialModule,
    HttpModule,
    MatPaginatorModule,
    NgbModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    CookieService,
    TicketAPIService,
    LoginAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
