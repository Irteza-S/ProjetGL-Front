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
import {MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './auth/login/login.component';
import { CustomMaterialModule } from './material.module';
import { TicketAPIService } from './services/api/ticket-api.service';
import { HttpModule } from '@angular/http';
import { LoginAPIService } from './services/login/login-api.service';
import { LogoutComponent } from './auth/logout/logout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketFormComponent,
    UserSessionComponent,
    LoginComponent,
    LogoutComponent
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
    NgbModule
  ],
  providers: [
    CookieService,
    TicketAPIService,
    LoginAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
