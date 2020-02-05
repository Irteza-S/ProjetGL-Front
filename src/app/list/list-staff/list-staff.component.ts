import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

export interface StaffTable {
  id: number;
  name: string;
  tel: string;
  mail: string;
  adress: string;
  edition: string;
}
const Ops: StaffTable[] = [
  {
    id:1, name: 'Valerie Dupont', tel: '0676267260', mail: 'valerie.dupont@pops2019.fr', adress:'6 Rue Guichard 98000 ', edition:'Modifier/Supprimer'
  },
  {
    id:2, name: 'Sophie Guy', tel: '0676267260', mail: 'sophie.guy@pops2019.fr', adress:'17 Rue Camus 75000', edition:'Modifier/Supprimer'
  },
  {
    id:3, name: 'Benoit Cerf', tel: '0676267260', mail: 'benoit.cerf@pops2019.fr', adress:'76 Rue Giscard 98000', edition:'Modifier/Supprimer'
  },
  {
    id:4, name: 'Caroline Dupré', tel: '0676267260', mail: 'caroline.dupre@pops2019.fr', adress:'64 Rue de Normandie 94230', edition:'Modifier/Supprimer'
  },
  {
    id:5,  name: 'John Smith', tel: '0676267260', mail: 'john.smith@pops2019.fr', adress:'35 Rue du Général de Gaule 75018 ', edition:'Modifier/Supprimer'
  }
]

const Techs: StaffTable[] = [
  {
    id:1, name: 'Benoit Cerf', tel: '0676267260', mail: 'benoit.cerf@pops2019.fr', adress:'76 Rue Giscard 98000', edition:'Modifier/Supprimer'
  },
  {
    id:2, name: 'Caroline Dupré', tel: '0676267260', mail: 'caroline.dupre@pops2019.fr', adress:'64 Rue de Normandie 94230', edition:'Modifier/Supprimer'
  },
  {
    id:3, name: 'Valerie Dupont', tel: '0676267260', mail: 'valerie.dupont@pops2019.fr', adress:'6 Rue Guichard 98000 ', edition:'Modifier/Supprimer'
  },
  {
    id:4, name: 'Sophie Guy', tel: '0676267260', mail: 'sophie.guy@pops2019.fr', adress:'17 Rue Camus 75000', edition:'Modifier/Supprimer'
  },
  {
    id:5, name: 'John Smith', tel: '0676267260', mail: 'john.smith@pops2019.fr', adress:'35 Rue du Général de Gaule 75018 ', edition:'Modifier/Supprimer'
  },
  {
    id:6, name: 'Benoit Cerf', tel: '0676267260', mail: 'benoit.cerf@pops2019.fr', adress:'76 Rue Giscard 98000', edition:'Modifier/Supprimer'
  },
  {
    id:7, name: 'Caroline Dupré', tel: '0676267260', mail: 'caroline.dupre@pops2019.fr', adress:'64 Rue de Normandie 94230', edition:'Modifier/Supprimer'
  },
  {
    id:8, name: 'Valerie Dupont', tel: '0676267260', mail: 'valerie.dupont@pops2019.fr', adress:'6 Rue Guichard 98000 ', edition:'Modifier/Supprimer'
  },
  {
    id:9, name: 'Sophie Guy', tel: '0676267260', mail: 'sophie.guy@pops2019.fr', adress:'17 Rue Camus 75000', edition:'Modifier/Supprimer'
  },
  {
    id:10, name: 'John Smith', tel: '0676267260', mail: 'john.smith@pops2019.fr', adress:'35 Rue du Général de Gaule 75018 ', edition:'Modifier/Supprimer'
  }
]

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit, AfterViewInit{

  public displayedColumns: string[] = ['name', 'tel', 'mail', 'adress', 'edition'];
  dataSource = new MatTableDataSource(Ops);
  dataSource2 = new MatTableDataSource(Techs);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
}
