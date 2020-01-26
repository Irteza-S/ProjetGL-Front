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
import { LoginComponent } from './login/login.component';
import { CustomMaterialModule } from './material.module';
import { TicketAPIService } from './services/api/ticket-api.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketFormComponent,
    UserSessionComponent,
    LoginComponent
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
<<<<<<< HEAD
    HttpModule
=======
    MatPaginatorModule
>>>>>>> e51c2d7817fb79eccb80d6404ffe8c28ab9f4fd5
  ],
  providers: [
    CookieService,
    TicketAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
