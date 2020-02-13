import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClientAPIService } from 'src/app/services/api/client-apiservice.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

export interface ClientTable {
  SIREN: number;
  Nom: string;
  Adresse: string;
  NbTickets: number;
  Demandeurs: string[];
}

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListClientComponent implements OnInit {

  Clients = [];
  columnsToDisplay = ['SIREN', 'Nom', 'Adresse', 'Nb Tickets'];
  dataSource = new MatTableDataSource(this.Clients);
  expandedElement: ClientTable | null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private clientAPI: ClientAPIService, private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.clientAPI.getClientList().subscribe(
      value => {
        this.initPage(value);
        this.spinnerService.hide(); },
        error => {console.log('ERROR', error); this.spinnerService.hide(); }
    );
  }

  ngOnInit() {
  }

  initPage(data) {
    const resSTR = JSON.parse(JSON.stringify(data));
    const body = JSON.parse(resSTR._body);
    console.log(body);
    this.Clients = [];
    for (const client of body) {
      const tmp = {
        SIREN: client.SIREN, Nom: client.name, Adresse: (client.adresse.numero + ' ' + client.adresse.rue +
        ' ' + client.adresse.codePostal + ' ' + client.adresse.ville), NbTickets: client.nbTicket, Demandeurs: client.demandeurs
      };
      this.Clients.push(tmp);
    }
    this.dataSource = new MatTableDataSource(this.Clients);
  }

  // tslint:disable-next-line:use-lifecycle-interface
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
