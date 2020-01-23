import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieService.set( 'name', 'Test Cookie' ); // To Set Cookie
  }
  getCookie() {
    console.log(this.cookieService.get('name'));
  }

}
