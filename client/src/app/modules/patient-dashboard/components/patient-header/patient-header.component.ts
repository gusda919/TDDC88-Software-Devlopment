import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { PatientService } from '../../../../core/services/patient.service';
import { Subscription } from 'rxjs';
import { NavComponent } from '../../../../core/header/nav/nav.component';
import {MatDialog} from '@angular/material/dialog';


let imageSource: string;

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
})

export class PatientHeaderComponent implements OnInit{
    //change this to dynamically change with real test data later
    name = "";
    personalNumber = "198605119885";
    triage = "gul";
    contagious: boolean;
    visitingFor = "";
    gender = "";
    subscription: Subscription;
    imageSource: string;

  constructor(private patientService: PatientService) {
    this.subscription = this.patientService.getPatientContagious(this.personalNumber).subscribe( (cont: any) => 
    (this.contagious = (cont ==="true") )); 
   
    this.patientService.getPatient(this.personalNumber).subscribe( (cont: any) => {
      this.name = cont.givenName + " " + cont.familyName,
      this.triage = cont.triage,
      this.visitingFor = cont.description.substr(cont.description.indexOf(" ") + 1).charAt(0).toUpperCase() + cont.description.substr(cont.description.indexOf(" ") + 1).slice(1),
      this.gender = cont.gender.charAt(0).toUpperCase() + cont.gender.slice(1)
    });

  }

  ngOnInit(){
    this.updateTriageColor();
  }

  openECG(pn: string) {
    console.log("Show EKG for " + pn);
    imageSource = '/assets/ECG.png'
  }

  openRoS(pn: string) {
    console.log("Open RoS for " + pn);
  }

  updateTriageColor(){

    // refactor idea to avoid unneeded code
    // triageColor?.setAttribute('style', ('background-color: ' + this.triage.toLowerCase()));

    let triageColor = document.getElementById('triageColor')
    if (this.triage === 'grön') {
      triageColor?.setAttribute('style', 'background-color: green');
    } else if (this.triage === 'gul') {
      triageColor?.setAttribute('style', 'background-color: yellow');
    } else if (this.triage === 'orange') {
      triageColor?.setAttribute('style', 'background-color: orange');
    } else if (this.triage === 'röd') {
      triageColor?.setAttribute('style', 'background-color: red');
    }
  }

  
}


