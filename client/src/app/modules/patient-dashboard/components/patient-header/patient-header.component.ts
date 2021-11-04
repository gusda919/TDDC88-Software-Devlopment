import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { PatientService } from '../../../../core/services/patient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
})

export class PatientHeaderComponent implements OnInit{
    //change this to dynamically change with real test data later
    name = "Test Persson";
    personalNumber = "195001232296";
    triage = "Red";
    contagious: boolean;
    visitingFor ="Stomach Ache";
    teamInCharge = "A";
    subscription: Subscription;

  constructor(private patientService: PatientService) {
    this.subscription = this.patientService.getPatientContagious(this.personalNumber).subscribe( (cont: any) => 
    (this.contagious = (cont ==="true") )); 
    // console.log(cont) );
    
  }
  ngOnInit(){
    this.updateTriageColor();

    //this.patientService.getPatientContagious(this.personalNumber).subscribe( (cont: any) => 
    // console.log(cont) );
    //this.contagious = cont );
  }

  updateTriageColor(){

    // refactor idea to avoid unneeded code
    // triageColor?.setAttribute('style', ('background-color: ' + this.triage.toLowerCase()));

    let triageColor = document.getElementById('triageColor')
    if (this.triage === 'Green') {
      triageColor?.setAttribute('style', 'background-color: green');
    } else if (this.triage === 'Yellow') {
      triageColor?.setAttribute('style', 'background-color: yellow');
    } else if (this.triage === 'Orange') {
      triageColor?.setAttribute('style', 'background-color: orange');
    } else if (this.triage === 'Red') {
      triageColor?.setAttribute('style', 'background-color: red');
    }
  }
}


