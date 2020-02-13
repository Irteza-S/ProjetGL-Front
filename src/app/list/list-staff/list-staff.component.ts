import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { UserAPIService } from 'src/app/services/api/user-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { LoginAPIService } from 'src/app/services/login/login-api.service';
import { User } from 'src/app/model/user';
import { UserType } from 'src/app/model/userole';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface StaffTable {
  id: number;
  name: string;
  tel: string;
  mail: string;
  adress: string;
  edition: string;
}
let Ops: StaffTable[] = [
];

const Techs: StaffTable[] = [
];

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit, AfterViewInit{

  public displayedColumns: string[] = ['id', 'name', 'tel', 'mail', 'adress', 'edition'];
  dataSource = new MatTableDataSource(Ops);
  dataSource2 = new MatTableDataSource(Techs);
  userIsAdmin = false;
  deleteStaffID;
  deleteStaffName;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private UserAPI: UserAPIService, private spinnerService: Ng4LoadingSpinnerService,
              private router: Router, private loginAPI: LoginAPIService, private modalService: NgbModal) {
    if (loginAPI.isUserAdmin()) {
      this.userIsAdmin = true;
    }
    this.spinnerService.show();
    this.UserAPI.listStaff().subscribe(
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
    const tmp = JSON.parse(resSTR._body);
    const body = JSON.parse(resSTR._body);
    console.log(tmp);
    Ops = [];
    for (const staff of body) {
      const tmp = {
        id: staff.staffId, name: (staff.staffName + ' ' + staff.staffSurname), tel: staff.staffTel,
        mail: staff.staffMail, adress: (staff.staffAdress.numero + ' ' + staff.staffAdress.rue +
        ' ' + staff.staffAdress.codePostal + ' ' + staff.staffAdress.ville),
        edition: 'Modifier/Supprimer'
      };
      Ops.push(tmp);
    }
    this.dataSource = new MatTableDataSource(Ops);
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

  openDialog(nom): void {
    console.log(nom);
    /*
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {var:nom}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });*/
  }

  editStaff(staffId) {
    this.spinnerService.show();
    console.log(staffId);
    this.router.navigate(['/form-staff', +staffId]);
  }

  deleteStaff() {
    console.log("StaffDeleted " + this.deleteStaffID);
  }

  openVerticallyCentered(content, staffId, staffName) {
    this.deleteStaffID = staffId;
    this.deleteStaffName = staffName;
    this.modalService.open(content, { centered: true });
  }
}
