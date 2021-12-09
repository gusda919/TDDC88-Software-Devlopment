
import { Component, Input, OnChanges } from '@angular/core';
import {Lab} from 'src/app/shared/models/patient';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import { PatientService } from '../../../../core/services/patient.service';

interface TimelineEvent {
  date: Date,
  icon: any,
  type: string,
  data: any,
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges {

  items = [
    ["B-Hb (Hemoglobin)" , 120, 170],
    ["B-EVF", 0.4, 0.5],
    ["B-Erytrocter", 3.9, 5.7],
    ["B-MCV", 82, 98],
    ["ERC(B)-MCH", 27, 33],
    ["ERC(B)-MCHC", 317, 357],
    ["B-Lekocyter", 3.5, 8.8],
    ["B-Trombocyter", 145, 348],
    ["P-APT-tid", 28, 40],
    ["P-KR (INR)", 0, 1.2],
    ["P-CRP", 0, 3],
    ["P-Natrium", 40, 240],
    ["P-Kalium", 3.6, 6.0],
    ["P-Kreatinin", 0, 133],
    ["Pt-Krea, eGFR, MDRD", 75, 150],
    ["Pt-Glukos", 4.0, 6.0],
  ];



  @Input() patientId: string;


  labs: Lab[];
  displayedLab: Lab;
  noLabDisplayed = true;

  faClock = faClock;

  constructor(private patientService: PatientService) { }


  ngOnChanges(): void {
    this.getPatientLabs();
  }

  getPatientLabs() {
    this.patientService.getPatientLabs(this.patientId).subscribe((labs: Lab[]) => {
      this.labs = labs;
      console.log(this.labs);
    });
  }

  displayLab(lab: Lab) {
    this.displayedLab = lab;
    this.noLabDisplayed = false;
  }

  closeDisplayedLab() {
    this.noLabDisplayed = true;
  }

  //  marks results below the approved thresshold in red
  markerColour(marker: string , value: any) {
   
    for (var item of this.items) {
      if(item[0]===marker) {
       if( value<item[1] || value>item[2]){
        return "red";
       }
    }
      
  }
 
    return "black";
  }

}