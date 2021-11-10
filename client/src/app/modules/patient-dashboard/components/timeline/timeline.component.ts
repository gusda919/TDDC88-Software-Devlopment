import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from 'src/app/core/services/patient.service';
import { Caregiving } from 'src/app/shared/models/patient';




interface TimelineEvent {
  date: Date,
  icon: string,
  type: string,
  data: {
    note: string,
  }
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

  events: TimelineEvent[] = [];



  constructor(private patientService: PatientService) { }


  ngOnInit(): void {
    this.patientService.getPatientCaregiving(this.patientId).subscribe((caregiving: Caregiving[]) => {      
      let events: TimelineEvent[] = caregiving.map((c: Caregiving): TimelineEvent => ({
        date: new Date(c.date+"T"+c.time),
        icon: 'caregiving-icon',
        type: 'caregiving',
        data: {
          note: c.note,
        }
      })
      );
      this.events = this.events.concat(events);    
    });
  }

  displayEvent(event: any) {
    this.displayedEvent = event;
  }

}
