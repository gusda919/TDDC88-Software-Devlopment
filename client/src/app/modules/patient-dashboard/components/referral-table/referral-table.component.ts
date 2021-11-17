import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ReferralTableDataSource, ReferralTableItem } from './referral-table-datasource';
import { faNotesMedical, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-referral-table',
  templateUrl: './referral-table.component.html',
  styleUrls: ['./referral-table.component.scss'],
  
})
export class ReferralTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ReferralTableItem>;
  dataSource: ReferralTableDataSource;
  @Input() patientId : string;
  
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date','updated', 'type', 'unit', 'answered'];
  isReferralsDisplayed = false;
  isNotesDisplayed = false;
  faNotesMedical = faNotesMedical;
  faEnvelope = faEnvelope;

  constructor(private PatientService: PatientService) {
    this.dataSource = new ReferralTableDataSource();
  }

  ngAfterViewInit(): void {
    console.log(this.patientId);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  showNotes() {
    if (this.isReferralsDisplayed) {
      this.isReferralsDisplayed = false;
    }
    this.isNotesDisplayed = !this.isNotesDisplayed;
    this.ngAfterViewInit();
  }

  showReferrals(){
    if (this.isNotesDisplayed) {
      this.isNotesDisplayed = false;
    }
    this.isReferralsDisplayed = !this.isReferralsDisplayed;
    this.ngAfterViewInit();
  }
}

  


