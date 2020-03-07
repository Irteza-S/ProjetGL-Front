import { Component, OnInit } from '@angular/core';

import { LoginAPIService } from '../../services/login/login-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authentocationService: LoginAPIService,
    private router: Router) {

  }

  ngOnInit() {
    this.authentocationService.logOut();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

}

