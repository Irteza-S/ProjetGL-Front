import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { timeout } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { LoginAPIService } from '../login/login-api.service';
const API_URL = 'http://127.0.0.1:8080/genielog/user';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  user: User;
  constructor(private http: Http, private loginAPI: LoginAPIService) { }

  // LOAD AN EXISTING TICKET
  createStaff(STAFF) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('CREATING STAFFAPI : ' + STAFF + ' ' + this.user.token);
      const data = {
        token: this.user.token,
        staff: STAFF
      };
      return this.http.post(API_URL + '/create', JSON.stringify(data), '')
      .pipe(timeout(10000))
      .map(resp => {
        return resp;
      });
    }
  }

  loadStaff(STAFFID) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('LOADING STAFFAPI : ' + STAFFID + ' ' + this.user.token);
      const data = {
        token: this.user.token,
        staffId: +STAFFID
      };
      return this.http.post(API_URL + '/init', JSON.stringify(data), '')
      .pipe(timeout(10000))
      .map(resp => {
        return resp;
      });
    }
  }

  saveStaff(STAFF) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('SAVING STAFFAPI : ' + STAFF + ' ' + this.user.token);
      const data = {
        token: this.user.token,
        staff: STAFF
      };
      console.log(data);
      return this.http.post(API_URL + '/modify', JSON.stringify(data), '')
      .pipe(timeout(10000))
      .map(resp => {
        return resp;
      });
    }
  }

  initNewStaff() {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('INIT STAFFAPI');
      const data = {
        token: this.user.token,
        staffId: -1
      };
      return this.http.post(API_URL + '/init', JSON.stringify(data), '')
      .pipe(timeout(10000))
      .map(resp => {
        return resp;
      });
    }
  }

  listStaff() {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('LIST STAFFAPI');
      const data = {
        token: this.user.token
      };
      return this.http.post(API_URL + '/list', JSON.stringify(data), '')
      .pipe(timeout(10000))
      .map(resp => {
        return resp;
      });
    }
  }

  deleteStaff(STAFFID) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('LIST STAFFAPI');
      const data = {
        token: this.user.token,
        staffId: +STAFFID
      };
      return this.http.post(API_URL + '/delete', JSON.stringify(data), '')
      .pipe(timeout(10000))
      .map(resp => {
        return resp;
      });
    }
  }
}
