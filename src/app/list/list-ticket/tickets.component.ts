import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

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
  {
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },
  {
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },
  {
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },
  {
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },
  {
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },
  {
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },
  {
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },{
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },{
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  },{
    num: 1, date: '02/09/2019', title: 'Installation d\'une nouvelle vitrine réfrigérée',
    client:'Boucherie ALAINE', type:'Demande', status:'En cours', tech: 'XX', edition:'Modifier'
  },
  {
    num: 2, date: '11/09/2019', title: 'Un des compresseurs de la chambre froide ne fonctionne plus',
    client:'Boucherie SANZO', type:'Incident', status:'Fermé', tech: 'YY', edition:'Consulter'
  },
  {
    num: 3, date: '02/09/2019', title: 'La vitrine réfrigérée n\'est plus assez froide',
    client:'Fauchon', type:'Incident', status:'En attente', tech: 'XX', edition:'Modifier'
  }
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
  constructor() { }

  ngOnInit() {
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
 