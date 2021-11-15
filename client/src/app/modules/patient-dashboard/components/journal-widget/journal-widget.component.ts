import { Component, OnInit, Input } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { faNotesMedical, faEnvelope} from '@fortawesome/free-solid-svg-icons';

import { PatientService } from 'src/app/core/mocks/patient.service';
import { Patient } from 'src/app/core/mocks/patient';

@Component({
  selector: 'app-journal-widget',
  templateUrl: './journal-widget.component.html',
  styleUrls: ['./journal-widget.component.scss']
})
export class JournalWidgetComponent implements OnInit {


  constructor(private patientService : PatientService) { }

  @Input() patientId : String;
  
  isNotesDisplayed = false;
  isReferralsDisplayed = false;
  faNotesMedical = faNotesMedical;
  faEnvelope = faEnvelope;

  


  ngOnInit(): void {

  }

  showNotes() {
    if (this.isReferralsDisplayed) {
      this.isReferralsDisplayed = false;
    }
    this.isNotesDisplayed = !this.isNotesDisplayed;
  }

  showReferrals(){
    if (this.isNotesDisplayed) {
      this.isNotesDisplayed = false;
    }
    this.isReferralsDisplayed = !this.isReferralsDisplayed;
  }


}
