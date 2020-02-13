import { Component, OnInit } from '@angular/core';
import { LoginAPIService } from '../../services/login/login-api.service';
import { Router } from '@angular/router';
import { User, Gender } from '../../model/user';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserType } from '../../model/userole';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  username =  '2';
  password = '1234';
  model: any = {};
  invalidLogin = false;

  constructor(private router: Router, private loginAPI: LoginAPIService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.spinnerService.show();
    this.loginAPI.authenticate(this.username, this.password).subscribe(
      value => {
        const resSTR = JSON.parse(JSON.stringify(value));
        const body = JSON.parse(resSTR._body);
        console.log(body);
        const staffRole = body.role[0];
        const staffId = body.id;
        const staffFirstName = body.firstName;
        const staffLastName = body.lastName;
        const token = body.token;
        if (staffRole === UserType.Admin) {
          console.log('Admin logged in');
          const admin = new User(staffId, Gender.Male, staffFirstName, staffLastName, UserType.Admin, token);
          sessionStorage.setItem('userSession', JSON.stringify(admin));
        } else if (staffRole === UserType.Technicien) {
          console.log('Tech logged in');
          const tech = new User(staffId, Gender.Male, staffFirstName, staffLastName, UserType.Technicien, token);
          sessionStorage.setItem('userSession', JSON.stringify(tech));
        }
        this.spinnerService.hide();
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
        this.invalidLogin = false;
      },
        error => {console.log('ERROR', error); this.spinnerService.hide(); this.invalidLogin = false; }
      );
      /*
    if (this.loginAPI.authenticate(this.username, this.password)) {
      this.router.navigate(['list']).then(() => {
        window.location.reload();
      });
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
  }*/
  }
}
