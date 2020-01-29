import { Component } from '@angular/core';
import { LoginAPIService } from './services/login/login-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetGL-Front';
  public constructor(private loginAPI: LoginAPIService) {

  }
}
