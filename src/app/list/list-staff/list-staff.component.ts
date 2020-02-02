import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

export interface StaffTable {
  name: string;
  tel: string;
  mail: string;
  adress: string;
}
const Ops: StaffTable[] = [
  {
    name: 'Valerie Dupont', tel: '0676267260', mail: 'valerie.dupont@pops2019.fr', adress:'6 Rue Guichard 98000 '
  },
  {
    name: 'Sophie Guy', tel: '0676267260', mail: 'sophie.guy@pops2019.fr', adress:'17 Rue Camus 75000'
  },
  {
    name: 'Benoit Cerf', tel: '0676267260', mail: 'benoit.cerf@pops2019.fr', adress:'76 Rue Giscard 98000'
  },
  {
    name: 'Caroline Dupré', tel: '0676267260', mail: 'caroline.dupre@pops2019.fr', adress:'64 Rue de Normandie 94230'
  },
  {
    name: 'John Smith', tel: '0676267260', mail: 'john.smith@pops2019.fr', adress:'35 Rue du Général de Gaule 75018 '
  }
]

const Techs: StaffTable[] = [
  {
    name: 'Benoit Cerf', tel: '0676267260', mail: 'benoit.cerf@pops2019.fr', adress:'76 Rue Giscard 98000'
  },
  {
    name: 'Caroline Dupré', tel: '0676267260', mail: 'caroline.dupre@pops2019.fr', adress:'64 Rue de Normandie 94230'
  },
  {
    name: 'Valerie Dupont', tel: '0676267260', mail: 'valerie.dupont@pops2019.fr', adress:'6 Rue Guichard 98000 '
  },
  {
    name: 'Sophie Guy', tel: '0676267260', mail: 'sophie.guy@pops2019.fr', adress:'17 Rue Camus 75000'
  },
  {
    name: 'John Smith', tel: '0676267260', mail: 'john.smith@pops2019.fr', adress:'35 Rue du Général de Gaule 75018 '
  },
  {
    name: 'Benoit Cerf', tel: '0676267260', mail: 'benoit.cerf@pops2019.fr', adress:'76 Rue Giscard 98000'
  },
  {
    name: 'Caroline Dupré', tel: '0676267260', mail: 'caroline.dupre@pops2019.fr', adress:'64 Rue de Normandie 94230'
  },
  {
    name: 'Valerie Dupont', tel: '0676267260', mail: 'valerie.dupont@pops2019.fr', adress:'6 Rue Guichard 98000 '
  },
  {
    name: 'Sophie Guy', tel: '0676267260', mail: 'sophie.guy@pops2019.fr', adress:'17 Rue Camus 75000'
  },
  {
    name: 'John Smith', tel: '0676267260', mail: 'john.smith@pops2019.fr', adress:'35 Rue du Général de Gaule 75018 '
  }
]
@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit, AfterViewInit{

  public displayedColumns: string[] = ['name', 'tel', 'mail', 'adress'];
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
