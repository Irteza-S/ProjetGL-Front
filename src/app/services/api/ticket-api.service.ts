import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { timeout } from 'rxjs/operators';
import { map } from 'rxjs-compat/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LoginAPIService } from '../login/login-api.service';
import { User } from 'src/app/model/user';

const API_URL = 'http://127.0.0.1:8080/genielog/ticket';

@Injectable({
  providedIn: 'root'
})

export class TicketAPIService {
  constructor(private http: Http, private loginAPI: LoginAPIService) { }
  user: User;
  // LOAD AN EXISTING TICKET
  loadTicket(CLIENTID, TICKETID) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('LOAD TICKET : ' + CLIENTID + ' ' + TICKETID + ' ' + this.user.token);
      const data = {
        token: this.user.token,
        clientId: CLIENTID,
        ticketId: TICKETID
      };
      return this.http.post(API_URL + '/init', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }

  // LOAD INFORMATIONS TO CREATE A NEW TICKET
  initNewTicket(CLIENTID) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('CREATE TICKET : ' + CLIENTID + this.user.token);
      const data = {
        token: this.user.token,
        clientId: CLIENTID,
        ticketId: -1
      };
      return this.http.post(API_URL + '/init', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }

  listAllTickets() {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('API TICKET - LIST ALL ');
      const data = {
        token: this.user.token,
        userId: -1
      };
      return this.http.post(API_URL + '/list', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }

  listMyTickets(userId) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      console.log('API TICKET - LIST MY TICKETS ');
      const data = {
        token: this.user.token,
        userId: +userId
      };
      return this.http.post(API_URL + '/list', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }

  editTicket(ticketJSON, clientId) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        clientId: +clientId,
        ticket: ticketJSON
      };
      console.log('EDIT TICKET : ' + JSON.stringify(data));
      return this.http.post(API_URL + '/modify', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }
  createTicket(ticketJSON, clientId) {
    this.user = this.loginAPI.isUserLoggedIn();
    if (this.user != null) {
      const data = {
        token: this.user.token,
        ticket: ticketJSON
      };
      console.log('EDIT TICKET : ' + JSON.stringify(data));
      return this.http.post(API_URL + '/create', JSON.stringify(data), '')
      .pipe(timeout(15000))
      .map(resp => {
        return resp;
      });
    }
  }



  // Error handling
  handleError(handleError: any): any {
    console.log('Error TICKETAPI');
    throw new Error('Error TICKETAPI');
  }

}

