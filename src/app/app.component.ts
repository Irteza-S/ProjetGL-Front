import { Component } from '@angular/core';
import { LoginAPIService } from './services/login/login-api.service';
import { Router} from '@angular/router';
import { TicketFormType } from './model/ticketformtype';
import { User } from './model/user';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientAPIService } from './services/api/client-apiservice.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetGL-Front';
  user: User;
  closeResult: string;
  clientList = [];
  clientNameForm;
  isUserLoggedIn = false;
  public constructor(private loginAPI: LoginAPIService, private router: Router, private http: Http,
                     private modalService: NgbModal, private fb: FormBuilder, private clientAPI: ClientAPIService,
                     private spinnerService: Ng4LoadingSpinnerService) {
    this.user = loginAPI.isUserLoggedIn();
    if (this.user != null) {
      this.spinnerService.show();
      this.isUserLoggedIn = true;
      this.clientNameForm = this.fb.group({
        clientName: fb.control('', Validators.required)
      });
      this.clientAPI.getClientList().subscribe(
        value => {
          const resSTR = JSON.parse(JSON.stringify(value));
          const body = JSON.parse(resSTR._body);
          console.log(body);
          if (body.length !== 0) {
            body.forEach(element => {
              const client = element.SIREN + '\t' + element.name;
              this.clientList.push(client);
            });
          }
          this.spinnerService.hide(); },
        error => {console.log('ERROR', error); this.spinnerService.hide(); }
      );
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openNewTicket() {
    console.log(this.clientNameForm);
    const client = this.clientNameForm.controls.clientName.value;
    const clientId = client.split('\t')[0];
    console.log(clientId);
    this.router.navigate(['/form-ticket', +clientId]);
  }
}
