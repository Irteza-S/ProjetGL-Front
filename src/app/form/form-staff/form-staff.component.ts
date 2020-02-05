import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { fbind } from 'q';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { StaffFormType } from '../../model/staffformtype';


@Component({
  selector: 'app-form-staff',
  templateUrl: './form-staff.component.html',
  styleUrls: ['./form-staff.component.css']
})
export class StaffFormComponent implements OnInit {

  staffFormType: StaffFormType;
  staffFormGroup: FormGroup;
  competenceList = ['Frigoriste', 'Plombier', 'Serrurier'];
  fonctionList = ['Opérateur', 'Responsable Technicien', 'Technicien'];


  constructor(private fb: FormBuilder, private ticketApi: TicketAPIService) {
    this.initForm(fb);
    // this.ticketFormType = formType;

  }


  ngOnInit() {
  }

  initForm(fb: FormBuilder) {
    this.staffFormGroup = fb.group({
      form_nom: fb.control('', Validators.required),
      form_prenom: fb.control('', Validators.required),
      form_adresse: fb.control('', Validators.required),
      form_numero: fb.control('', Validators.required),
      form_fonction: fb.control('', Validators.required),
      form_competence: fb.control('', Validators.required),
    });
  }


  sendForm() {
    console.log(this.staffFormGroup);
    //console.log(this.ticketApi.test2());
    //this.ticketApi.test2();
    //this.ticketApi.okok2();
    // console.log(this.ticketApi.initTicket(123456789, 2));
  }

}
