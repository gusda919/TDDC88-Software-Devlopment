import { Component, OnInit, Input,ChangeDetectorRef, NgModule } from '@angular/core';

import { EntrancesAndExit, VitalParameters } from 'src/app/shared/models/patient';
import { PatientService } from '../../../../core/services/patient.service'
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-body-silhouette',
  templateUrl: './body-silhouette.component.html',
  styleUrls: ['./body-silhouette.component.scss']
})
export class BodySilhouetteComponent implements OnInit {
 

  @Input() patientId: string; 

  isListDisplayed = false;
  
  entrancesAndExits: EntrancesAndExit[];
  constructor(private patientService: PatientService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.patientService.getPatientEntrancesAndExits(this.patientId).subscribe((entrancesAndExits: EntrancesAndExit[]) => {
      this.entrancesAndExits = entrancesAndExits;
      this.cdr.detectChanges();
    });
  }

 

  toggleList() {
    if(!this.isListDisplayed) {
      this.checkIfListIsToggled();

    }
    this.isListDisplayed = !this.isListDisplayed;
  }

  checkIfListIsToggled() {
    if (this.isListDisplayed) {
      this.isListDisplayed = false;
    }
  }





}
 
