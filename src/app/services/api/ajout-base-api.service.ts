import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { timeout } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { LoginAPIService } from '../login/login-api.service';
const API_URL = 'http://127.0.0.1:8080/genielog/ajoutBase';

@Injectable({
  providedIn: 'root'
})
export class AjoutBaseAPIService {
  user: User;
  constructor(private loginAPI: LoginAPIService, private http: Http) { }

  createAdresse(SITE) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        adresse: SITE
      };
      console.log('Creating adresse ' + data);
      return this.http.post(API_URL + '/adresse', JSON.stringify(data), '')
        .pipe(timeout(30000))
        .map(resp => {
          return resp;
        });
    }
  }

  createCompetence(COMPETENCE) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        competence: COMPETENCE
      };
      console.log('Creating competence ' + data);
      return this.http.post(API_URL + '/addCompetence', JSON.stringify(data), '')
        .pipe(timeout(30000))
        .map(resp => {
          return resp;
        });
    }
  }
}
