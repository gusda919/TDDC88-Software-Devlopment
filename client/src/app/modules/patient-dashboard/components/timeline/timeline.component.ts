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
  ticking: Boolean = false;


  @Input() patientId: string;

  caregiving: Caregiving[];
  labs: Lab[];
  drugs: Drug[];
  events: TimelineEvent[] = [];
  clickedButton: any;

  faMicroscope = faMicroscope;
  faPills = faPills;
  faHandHoldingMedical = faHandHoldingMedical;
  

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
    
    setTimeout(this.setScroll.bind(this), 800);
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

  setScroll() {
    // scroll to the latest event
    let tlw = document.getElementById("timeline-wrapper");
    if (tlw && tlw?.scrollLeft >= 0) tlw.scrollLeft = tlw?.scrollWidth;

    tlw?.addEventListener('scroll', (e) => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {

          if (tlw && tlw?.scrollLeft <= 100) {
            console.log("show left arrow");
          }
          if (tlw && tlw?.scrollLeft >= tlw?.offsetWidth-150) {
            console.log("show right arrow");
          }
          this.ticking = false;
        }); 
        this.ticking = true;
      }
    });
  }

}
