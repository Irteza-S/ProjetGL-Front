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

const API_URL = 'http://127.0.0.1:8080/genielog/ticket';

@Injectable({
  providedIn: 'root'
})

export class TicketAPIService {

  constructor(private http: Http) { }

  // LOAD AN EXISTING TICKET
  loadTicket(CLIENTID, TICKETID) {
    console.log('LOAD : ' + CLIENTID + ' ' + TICKETID);
    const data = {
      clientId: CLIENTID,
      ticketId: TICKETID
    };
    return this.http.post(API_URL + '/init', JSON.stringify(data), '')
    .pipe(timeout(10000))
    .map(resp => {
      return resp;
    });
  }

  // LOAD INFORMATIONS TO CREATE A NEW TICKET
  initNewTicket(CLIENTID) {
    console.log('CREATE : ' + CLIENTID);
    const data = {
      clientId: CLIENTID,
      ticketId: -1
    };
    return this.http.post(API_URL + '/init', JSON.stringify(data), '')
    .pipe(timeout(5000))
    .map(resp => {
      return resp;
    });
  }

  listAllTickets() {
    console.log('API TICKET - LIST ALL ');
    const data = {
      userId: -1
    };
    return this.http.post(API_URL + '/list', JSON.stringify(data), '')
    .pipe(timeout(10000))
    .map(resp => {
      return resp;
    });
  }

  editTicket(ticketJSON, clientId) {
    const data = {
      clientId: +clientId,
      ticket: ticketJSON
    };
    console.log('EDIT TICKET : ' + JSON.stringify(data));
    return this.http.post(API_URL + '/modify', JSON.stringify(data), '')
    .pipe(timeout(10000))
    .map(resp => {
      return resp;
    });
  }
  createTicket(ticketJSON, clientId) {
    const data = {
      ticket: ticketJSON
    };
    console.log('EDIT TICKET : ' + JSON.stringify(data));
    return this.http.post(API_URL + '/create', JSON.stringify(data), '')
    .pipe(timeout(10000))
    .map(resp => {
      return resp;
    });
  }



  // Error handling
  handleError(handleError: any): any {
    console.log('Error TICKETAPI');
    throw new Error('Error TICKETAPI');
  }

}

