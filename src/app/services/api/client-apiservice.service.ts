import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { timeout } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { LoginAPIService } from '../login/login-api.service';
const API_URL = 'http://127.0.0.1:8080/genielog/client';
@Injectable({
  providedIn: 'root'
})
export class ClientAPIService {
  user: User;
  constructor(private http: Http, private loginAPI: LoginAPIService) { }

  getCLientId(CLIENTNAME) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('GettingClientID : ' + CLIENTNAME + ' ' + this.user.token);
      const data = {
        token: this.user.token,
        clientName: CLIENTNAME
      };
      return this.http.post(API_URL + '/getId', JSON.stringify(data), '')
      .pipe(timeout(10000))
      .map(resp => {
        return resp;
      });
    }
  }

  getClientList() {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
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

  loadClient(CLIENTID) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        SIREN: +CLIENTID
      };
      console.log('LOAD CLIENT ' + JSON.stringify(data));
      return this.http.post(API_URL + '/init', JSON.stringify(data), '')
        .pipe(timeout(10000))
        .map(resp => {
          return resp;
        });
    }
  }

  initNewClient() {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        clientId: -1
      };
      return this.http.post(API_URL + '/init', JSON.stringify(data), '')
        .pipe(timeout(10000))
        .map(resp => {
          return resp;
        });
    }
  }

  createClient(CLIENT) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        client: CLIENT
      };
      return this.http.post(API_URL + '/create', JSON.stringify(data), '')
        .pipe(timeout(10000))
        .map(resp => {
          return resp;
        });
    }
  }

  editClient(CLIENT) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        client: CLIENT
      };
      return this.http.post(API_URL + '/modify', JSON.stringify(data), '')
        .pipe(timeout(10000))
        .map(resp => {
          return resp;
        });
    }
  }

}
