import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { fbind } from 'q';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { StaffFormType } from '../../model/staffformtype';
import { ActivatedRoute } from '@angular/router';


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


  constructor(private fb: FormBuilder, private ticketApi: TicketAPIService, private route: ActivatedRoute) {
    this.initForm(fb);
    // this.ticketFormType = formType;
    this.route.paramMap.subscribe(params => {
      const tmp = params.get('userId');
      console.log(tmp);
      if (tmp) {
        console.log('OLD');
        this.staffFormType = StaffFormType.Edit;
        // Load user informations from backend
      } else {
        console.log('NEW');
        this.staffFormType = StaffFormType.Create;
      }
    });
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
  }

}
