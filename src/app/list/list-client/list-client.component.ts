import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface ClientTable {
  id: number;
  name: string;
  adress: string;
  nbTickets: number;
  data: string[];
}
const Clients: ClientTable[] = [ 
{
  id:12, name:'Boucherie ALLAINE', adress:'a', nbTickets:3, data:["Matrin Luther", "Sophie Tripoteau"]
},
{
  id:66, name:'Fauchon', adress:'b', nbTickets:12, data:["Matrin Luther", "Sophie Tripoteau"]
},
{
  id:987, name:'Boucherie Sanzo', adress:'c', nbTickets:2, data:["Matrin Luther", "Sophie Tripoteau"]
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

  columnsToDisplay = ['name', 'id', 'nbTickets', 'adress'];
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
