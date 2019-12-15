import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AppRoutingModule } from './app-routing.module';
import { TicketFormComponent } from './ticket-form/ticket-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
