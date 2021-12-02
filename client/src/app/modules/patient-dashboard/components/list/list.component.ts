import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Caregiving, Lab, Drug } from 'src/app/shared/models/patient';
import { faMicroscope, faPills, faHandHoldingMedical, faClock} from '@fortawesome/free-solid-svg-icons'




import { PatientService } from '../../../../core/services/patient.service'
import { reduce } from 'rxjs/operators';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

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
export class ListComponent implements OnInit {

  displayedEvent: TimelineEvent;


  @Input() patientId: string;

  caregiving: Caregiving[];
  labs: Lab[];
  drugs: Drug[];
  events: TimelineEvent[] = [];

  faMicroscope = faMicroscope;
  faPills = faPills;
  faHandHoldingMedical = faHandHoldingMedical;
  faClock = faClock;
  clickedButton: any;
  
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
        

  

  constructor(private patientService: PatientService) { }


  ngOnInit(): void {
    this.patientService.getPatientLabs(this.patientId).subscribe((labs: Lab[]) => {      
      let events: TimelineEvent[] = labs.map((l: Lab): TimelineEvent => ({
        date: new Date(l.date+"T"+l.time),
        icon: faMicroscope,
        type: 'lab',
        data: l.tests,
      })
      );
      this.events = this.events.concat(events); 
        
    });

  }

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

 

  getPatientLabs() {
    this.patientService.getPatientLabs(this.patientId).subscribe((labs: Lab[]) => {      
      let events: TimelineEvent[] = labs.map((l: Lab): TimelineEvent => ({
        date: new Date(l.date+"T"+l.time),
        icon: faMicroscope,
        type: 'lab',
        data: l.tests,
      })
      );
      this.events = this.events.concat(events); 
       
    });
  }

  

  sortData() {
    return this.events.sort((a: TimelineEvent, b: TimelineEvent) => {
      return <any>new Date(a.date) - <any>new Date(b.date);
    });
  }

  displayEvent(event: any) {
    this.displayedEvent = event;
  }
  closeDisplayedEvent() {
    this.displayedEvent = <TimelineEvent>{};
    this.clickedButton = null;
  }
}


