import { Component, OnInit } from '@angular/core';
import { LoginAPIService } from '../../services/login/login-api.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  username: string;
  password: string;
  model: any = {};
  invalidLogin = false;

  constructor(private router: Router, private loginAPI: LoginAPIService) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.loginAPI.authenticate(this.username, this.password)) {
      this.router.navigate(['list']).then(() => {
        window.location.reload();
      });
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
  }
  }
}
