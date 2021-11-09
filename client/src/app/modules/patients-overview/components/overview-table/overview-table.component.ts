import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { PatientService } from 'src/app/core/mocks/patient.service';
import { Patient } from 'src/app/core/mocks/patient';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss']
})
export class OverviewTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Patient>;
  dataSource: MatTableDataSource<Patient> = new MatTableDataSource<Patient>();

  triageColor(name: String): string { 

    if(name == "green") {
      return "normal";
    }
    
    if(name == "yellow") {
      return "low";
    }
    if(name == "red") {
      return "high";
    }

    return "primary";
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['issue', 'name', 'id' ,'date', 'triage'];
  groupedColumns =['header'];

  constructor(private patientService: PatientService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getPatientData();
  }

  getPatientData() {
    this.patientService.getPatients().subscribe(patients => { 
      this.dataSource.data = patients;
    });

  }
}
