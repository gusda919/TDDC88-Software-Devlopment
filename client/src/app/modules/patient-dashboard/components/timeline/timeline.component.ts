import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from 'src/app/core/services/patient.service';
import { Caregiving, Lab, Drug } from 'src/app/shared/models/patient';
import { faMicroscope, faPills, faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons'



interface TimelineEvent {
  date: Date,
  icon: any,
  type: string,
  data: any,
}



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  
  displayedEvent: TimelineEvent;


  @Input() patientId: string;

  caregiving: Caregiving[];
  labs: Lab[];
  drugs: Drug[];
  events: TimelineEvent[] = [];
  clickedButton: any;

  faMicroscope = faMicroscope;
  faPills = faPills;
  faHandHoldingMedical = faHandHoldingMedical;
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
    this.patientService.getPatientCaregiving(this.patientId).subscribe((caregiving: Caregiving[]) => {      
      let events: TimelineEvent[] = caregiving.map((c: Caregiving): TimelineEvent => ({
        date: new Date(c.date+"T"+c.time),
        icon: faHandHoldingMedical,
        type: 'caregiving',
        data: c.note
      })
      );
      this.events = this.events.concat(events);
      this.getPatientLabs();
    });

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
      this.getPatientDrugs();    
    });
  }

  getPatientDrugs() {
    this.patientService.getPatientDrugs(this.patientId).subscribe((drugs: Drug[]) => {      
      let events: TimelineEvent[] = drugs.map((d: Drug): TimelineEvent => ({
        date: new Date(d.date+"T"+d.time),
        icon: faPills,
        type: 'drug',
        data: {
          type: d.type,
          dose: d.dose
        }
      })
      );
      this.events = this.events.concat(events);
      this.sortData(); 
    });
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
