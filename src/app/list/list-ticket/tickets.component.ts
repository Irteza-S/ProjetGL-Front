import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoginAPIService } from 'src/app/services/login/login-api.service';
import { User } from 'src/app/model/user';
import { ClientAPIService } from '../../services/api/client-apiservice.service';

import { Router } from '@angular/router';

export interface TicketsTable {
  num: number;
  date: string;
  title: string;
  clientId: string;
  clientNom: string;
  type: string;
  status: string;
  tech: string;
  edition: string;

  }
let ELEMENT_DATA_ALL: TicketsTable[] = [];
let ELEMENT_DATA_MY: TicketsTable[] = [];

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['num', 'date', 'title', 'client', 'type', 'status', 'tech', 'edition'];
  dataSourceAllTickets = new MatTableDataSource(ELEMENT_DATA_ALL);
  dataSourceMyTickets = new MatTableDataSource(ELEMENT_DATA_MY);
  user: User;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private ticketAPI: TicketAPIService, private spinnerService: Ng4LoadingSpinnerService,
              private loginAPI: LoginAPIService, private clientAPI: ClientAPIService,
              private router: Router) {
    ELEMENT_DATA_ALL = [];
    ELEMENT_DATA_MY = [];
    this.spinnerService.show();
    this.user = loginAPI.isUserLoggedIn();
    if (this.user != null) {
      this.ticketAPI.listAllTickets().subscribe(
        value => {
          this.initListAllTickets(value);
        },
          error => {console.log('ERROR', error); }
      );
      this.ticketAPI.listMyTickets(this.user.id).subscribe(
        value => {
          this.initListMyTickets(value);
        },
          error => {console.log('ERROR', error); }
      );
    }
    this.spinnerService.hide();
  }

  ngOnInit() {
  }

  initListAllTickets(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    console.log(body);
    for (const ticket of body) {
      const technicien = ticket.technicien.id + ' ' + ticket.technicien.nom + ' ' + ticket.technicien.prenom;
      const tmp = {
        num: ticket.id,
        date: '02/09/2019',
        title: ticket.objet,
        clientId: '12',
        clientNom: ticket.nomClient,
        type: ticket.type,
        status: ticket.statut,
        tech: technicien,
        edition: 'Modifier'
      };
      ELEMENT_DATA_ALL.push(tmp);
    }
    this.dataSourceAllTickets = new MatTableDataSource(ELEMENT_DATA_ALL);
  }

  initListMyTickets(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    console.log(body);
    for (const ticket of body) {
      const technicien = ticket.technicien.id + ' ' + ticket.technicien.nom + ' ' + ticket.technicien.prenom;
      const tmp = {
        num: ticket.id,
        date: '02/09/2019',
        title: ticket.objet,
        clientId: '12',
        clientNom: ticket.nomClient,
        type: ticket.type,
        status: ticket.statut,
        tech: technicien,
        edition: 'Modifier'
      };
      ELEMENT_DATA_MY.push(tmp);
    }
    this.dataSourceMyTickets = new MatTableDataSource(ELEMENT_DATA_MY);
  }

  ngAfterViewInit(): void {
    this.dataSourceAllTickets.sort = this.sort;
    this.dataSourceAllTickets.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSourceAllTickets.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAllTickets.paginator) {
      this.dataSourceAllTickets.paginator.firstPage();
    }
  }

  editTicket(clientName, ticketId) {
    this.spinnerService.show();
    console.log(clientName);
    this.clientAPI.getCLientId(clientName).subscribe(
      value => {
        console.log(value);
        const resSTR = JSON.parse(JSON.stringify(value));
        const clientId = JSON.parse(resSTR._body);
        this.router.navigate(['/form-ticket', +clientId, +ticketId]);
      },
        error => {console.log('ERROR', error); }
    );
    this.spinnerService.hide();
  }
}
