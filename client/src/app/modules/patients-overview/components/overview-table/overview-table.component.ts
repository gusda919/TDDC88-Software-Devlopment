import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { PatientService } from 'src/app/core/mocks/patient.service';
import { Patient } from 'src/app/core/mocks/patient';
import { DataSource } from '@angular/cdk/collections';

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

  triageTextMap: any  = {
    "green": "Grön",
    "yellow": "Gul",
    "orange": "Orange",
    "red": "Röd"
  }
  triageColorMap: any = {
    "green": "normal",
    "yellow": "low",
    "red": "high"
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['issue', 'name', 'id' ,'date', 'triage'];
  groupedColumns =['header'];
  sortedData: Patient[];

  constructor(private patientService: PatientService) {
    this.sortedData = this.dataSource.data;
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

  sortData(sort:Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      console.log(a);
      console.log(b);
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.last_name, b.last_name, isAsc);
        case 'issue':
          return compare(a.visiting_for, b.visiting_for, isAsc);
        case 'id':
          return compare(a.ssn, b.ssn, isAsc);
        case 'date':
          return compare(a.visiting_date, b.visiting_date, isAsc);
        
        default:
          return 0;

      }
    });


  }

  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
