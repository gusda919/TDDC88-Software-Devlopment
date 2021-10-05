import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
})
export class PatientHeaderComponent implements OnInit{
    //change this to dynamically change with real test data later
    name = "Test Persson";
    personalNumber = "20000101-0101";
    triage = "Orange";
    visitingFor ="Stomach Ache";
    teamInCharge = "A";

  constructor() {}
  ngOnInit(){
    this.updateTriageColor();
  }

  updateTriageColor(){
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


