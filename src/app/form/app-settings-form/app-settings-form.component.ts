import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { fbind } from 'q';
import { TicketAPIService } from '../../services/api/ticket-api.service';
import { TicketFormType } from '../../model/ticketformtype';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Timer } from '../..//model/timer';
import { State } from '../../model/state';
import { tick } from '@angular/core/testing';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AjoutBaseAPIService } from 'src/app/services/api/ajout-base-api.service';


@Component({
  selector: 'app-app-settings-form',
  templateUrl: './app-settings-form.component.html',
  styleUrls: ['./app-settings-form.component.css']
})
export class AppSettingsFormComponent implements OnInit {
  clientId;
  appSettingsForm;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,
    private modalService: NgbModal, private router: Router, private AjoutBaseAPI: AjoutBaseAPIService) {
      this.initForm(this.fb);
      this.route.paramMap.subscribe(params => {
        this.clientId = params.get('userId');
      });
    }

  ngOnInit() {

  }

  
  initForm(fb: FormBuilder) {
    this.appSettingsForm = fb.group({
      competence: fb.control('', Validators.required),
    })
  }

  sendForm() {
    const newCompetence = this.appSettingsForm.controls.competence.value;
    this.spinnerService.show();
    this.AjoutBaseAPI.createCompetence(newCompetence).subscribe(
      value => {
        console.log(value);
        this.spinnerService.hide();
        this.router.navigate(['/gestion']);
      },
        error => {console.log('ERROR', error); this.spinnerService.hide(); }
    );
  }
  
}
