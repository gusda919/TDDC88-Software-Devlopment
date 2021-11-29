import { Component, Input, OnInit } from '@angular/core';
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
    
    ecgOpen = false;

    @Input()
    patientId: string = "";

    triage = "gul";
    contagious: boolean;
    visitingFor = "";
    gender = "";
    roomBed = "";
    subscription: Subscription;
    imageSource: string;

  constructor(private patientService: PatientService) {

    this.subscription = this.patientService.getPatientContagious(this.patientId).subscribe( (cont: any) => 
    (this.contagious = (cont ==="true") )); 

  }
  ngOnInit(){

    this.patientService.getPatient(this.patientId).subscribe( (pat: any) => {
      this.name = pat.givenName + " " + pat.familyName,
      this.triage = pat.triage,
      this.contagious = pat.contagious ==="true",
      this.visitingFor = pat.description.substr(pat.description.indexOf(" ") + 1).charAt(0).toUpperCase() + pat.description.substr(pat.description.indexOf(" ") + 1).slice(1),
      this.gender = pat.gender.charAt(0).toUpperCase() + pat.gender.slice(1);
      this.roomBed = pat.roomBed;
      this.updateTriageColor();
    });

  }


  openRoS(pn: string) {
    console.log("Open RoS for " + pn);
  }

  updateTriageColor(){
    let triageColor = document.getElementById('triageColor')
    triageColor?.setAttribute('style', 'background-color: ' + this.triage);
  }

   hideImg() {

   }

   openECGModal(patientId: string) {
    let modal = document.getElementById("myModal");

    document.getElementById('ECGimg')?.setAttribute('alt', 'Ingen EKG hittades för patient med personnummer ' + patientId );
    document.getElementById('ECGimg')?.setAttribute('src', '/assets/ECG' + patientId + '.png');
    //document.getElementById('ECGimg')?.setAttribute('onerror', "this.style.display='none'");
    document.getElementById('ECGimg')?.setAttribute('onerror', "hideImg()");

    modal?.style.setProperty("display", "block")
    
    document.getElementById('outer-wrapper-id')?.style.setProperty('opacity', '0.7');
    document.getElementById('sidenav-id')?.style.setProperty('opacity', '0.2');
  }

  closeECGModal() {
    console.log("closing")
    let modal = document.getElementById("myModal");
    modal?.style.setProperty("display", "none")

    document.getElementById('outer-wrapper-id')?.style.setProperty('opacity', '1');
    document.getElementById('sidenav-id')?.style.setProperty('opacity', '1');
  }
  
}


