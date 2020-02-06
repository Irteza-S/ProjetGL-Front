import { Component } from '@angular/core';
import { LoginAPIService } from './services/login/login-api.service';
import { Router} from '@angular/router';
import { TicketFormType } from './model/ticketformtype';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetGL-Front';
  user: User;
  public constructor(private loginAPI: LoginAPIService, private router: Router) {
    this.user = loginAPI.isUserLoggedIn();
  }
}
