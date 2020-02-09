import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


export interface TicketsTable {
  num: number;
  date: string;
  title: string;
  client: string;
  type: string;
  status: string;
  tech: string;
  edition: string;
  }
const ELEMENT_DATA: TicketsTable[] = [
];

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['num', 'date', 'title', 'client', 'type', 'status', 'tech', 'edition'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private ticketAPI: TicketAPIService, private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.ticketAPI.listAllTickets().subscribe(
      value => {
        this.initListAllTickets(value);
        this.spinnerService.hide();
      },
        error => {console.log('ERROR', error); this.spinnerService.hide(); }
    );
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
        client: ticket.nomClient,
        type: ticket.type,
        status: ticket.statut,
        tech: technicien,
        edition: 'Modifier'
      };
      ELEMENT_DATA.push(tmp);
    }
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  initListMyTickets(data) {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
