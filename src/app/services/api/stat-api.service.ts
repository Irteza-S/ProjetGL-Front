import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { timeout } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { LoginAPIService } from '../login/login-api.service';
const API_URL = 'http://127.0.0.1:8080/genielog/stat';

@Injectable({
  providedIn: 'root'
})
export class StatAPIService {
  user: User;
  constructor(private http: Http, private loginAPI: LoginAPIService) { }

  getStatTicketParCLient() {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token
      };
      return this.http.post(API_URL + '/statTicketParClient', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }
  
  getStatTicketParCategorie() {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token
      };
      return this.http.post(API_URL + '/statTicketParCategorie', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }
}
