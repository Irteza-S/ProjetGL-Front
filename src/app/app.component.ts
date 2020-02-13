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
  clientList = ['Carefour', 'Fnac', 'LeroyMerlin'];
  clientNameForm;
  isUserLoggedIn = false;
  public constructor(private loginAPI: LoginAPIService, private router: Router, private http: Http,
                     private modalService: NgbModal, private fb: FormBuilder, private clientAPI: ClientAPIService) {
    this.user = loginAPI.isUserLoggedIn();
    if (this.user != null) {
      this.isUserLoggedIn = true;
    }
    this.clientNameForm = this.fb.group({
      clientName: fb.control('', Validators.required)
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openNewTicket() {
    console.log(this.clientNameForm);
    const name = this.clientNameForm.controls.clientName.value;
    this.router.navigate(['/form-ticket', name]);
  }
}
