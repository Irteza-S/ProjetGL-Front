import { Component } from '@angular/core';
import { LoginAPIService } from './services/login/login-api.service';
import { Router} from '@angular/router';
import { TicketFormType } from './model/ticketformtype';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetGL-Front';
  ticketFormType = TicketFormType.Create;
  public constructor(private loginAPI: LoginAPIService, private router: Router) {

  }

  session() {
    const user = sessionStorage.getItem('userSession');
    console.log(JSON.parse(user));
  }
  openForm() {
    this.router.navigate(['/form']);
  }
}
