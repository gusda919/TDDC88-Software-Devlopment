import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
export class TimelineComponent implements OnChanges {
  
  displayedEvent: TimelineEvent;
  
  // attributes used for displaying arrows
  ticking: Boolean = false;
  displayLeftArrow: Boolean = true;
  displayRightArrow: Boolean = true;
  firstRender: Boolean = true;

  currentDate: Date;
  currentMarkerPosition: number = 0;


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


  ngOnChanges(): void {

    this.caregiving = [];
    this.labs = [];
    this.drugs = [];
    this.events = [];
    this.closeDisplayedEvent();

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
      this.setCurrentDateMarker();
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

  setCurrentDateMarker() {
    let today = new Date();
    this.currentDate = today;

    let counter = 0;
    this.events.forEach((event) => {
      if (event.date < today) {
        counter++;
      }
    });

    let px  = 65 +  241 * counter;
    let marker = document.getElementById("current-date-marker");
    if (marker) marker.style.left = px.toString() + "px";

    let overlay = document.getElementById("timeline-overlay");
    if (overlay) overlay.style.width = (px+56).toString() + "px";

    this.currentMarkerPosition = px;

  }

  setScroll() {
    this.scrollCurrentDate();
    let tlw = document.getElementById("timeline-wrapper");

    tlw?.addEventListener('scroll', (e) => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {

          // if (vw && vw < (this.events.length + 4) * 160) {
            if (tlw && tlw?.scrollLeft <= 160) { // left arrow should be hidden
              if (this.displayLeftArrow) {
                // only hide if currently displayed
                document.getElementById("left-arrow-wrapper")?.classList.toggle("hide-arrow-wrapper");
                this.displayLeftArrow = false;
              }
            } else { // left arrow should be displayed
              if (!this.displayLeftArrow) {
                // only display if currently hidden
                document.getElementById("left-arrow-wrapper")?.classList.toggle("hide-arrow-wrapper");
                this.displayLeftArrow = true;
              }
            }
            
            if (tlw && tlw.scrollLeft + tlw.offsetWidth >= tlw.scrollWidth-160) { // right arrow should be hidden
              if (this.displayRightArrow) {
                // only hide if currently displayed
                document.getElementById("right-arrow-wrapper")?.classList.toggle("hide-arrow-wrapper");
                this.displayRightArrow = false;
              }
            } else { // right arrow should be displayed
              if (!this.displayRightArrow) {
                // only display if currently hidden
                document.getElementById("right-arrow-wrapper")?.classList.toggle("hide-arrow-wrapper");
                this.displayRightArrow = true;
              }
            }
          

          this.ticking = false; // ticking variable used to optimize rendering
        }); 
        this.ticking = true;
      }
    });

    tlw?.dispatchEvent(new Event("scroll"));
  }

  scrollFarLeft() {
    let tlw = document.getElementById("timeline-wrapper");
    if (tlw && tlw?.scrollLeft >=0) tlw.scrollLeft = 0;
  }
  scrollFarRight() {
    let tlw = document.getElementById("timeline-wrapper");
    if (tlw && tlw?.scrollLeft >=0) tlw.scrollLeft = tlw.scrollWidth;
  }

  scrollCurrentDate() {
    let tlw = document.getElementById("timeline-wrapper");
    if (tlw && tlw?.scrollLeft >=0) tlw.scrollLeft = this.currentMarkerPosition - (tlw.offsetWidth/2 - 60);
  }

}


