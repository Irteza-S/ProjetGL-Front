import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface ClientTable {
  Id: number;
  Nom: string;
  Adresse: string;
  NbTickets: number;
  data: string[];
}
const Clients: ClientTable[] = [ 
{
  Id:123, Nom:'Boucherie ALLAINE', Adresse:'35 Rue du Général de Gaule 75018 Paris', NbTickets:3, data:["Matrin Luther", "Sophie Tripoteau"]
},
{
  Id:666, Nom:'Fauchon', Adresse:'64 Rue de Normandie 94230 Cachan', NbTickets:12, data:["Benoit Dupont", "Sophie Lessier", "Aicha Drame"]
},
{
  Id:987, Nom:'Boucherie Sanzo', Adresse:'6 Rue Guichard 75002 Paris ', NbTickets:2, data:["Valerie Dumas", "Jean Puteau"]
}
]

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

  columnsToDisplay = ['Nom', 'Id', 'NbTickets', 'Adresse'];
  dataSource = new MatTableDataSource(Clients);
  expandedElement: ClientTable | null;

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
