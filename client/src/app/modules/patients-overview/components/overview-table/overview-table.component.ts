import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/shared/models/patient';
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
  triageValueMap: any = {
    "green": 1,
    "yellow": 2,
    "orange": 3,
    "red": 4
  }
  triageColorMap: any = {
    "green": "normal",
    "yellow": "low",
    "red": "high"
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['issue', 'gender', 'name', 'id' ,'date', 'nextVisit', 'triage'];
  //displayedColumns = ['issue', 'gender', 'name', 'id' ,'date', 'triage'];

  groupedColumns = ['header'];
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


    this.dataSource.data = data.sort((a: Patient, b: Patient) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.familyName, b.familyName, isAsc);
          case 'gender':
          return compare(a.gender, b.gender, isAsc);
        case 'issue':
          return compare(a.description, b.description, isAsc);
        case 'id':
          return compare(a.patientID, b.patientID, isAsc);
        case 'date':
          return compare(a.caregiving[a.caregiving.length-1].time, b.caregiving[b.caregiving.length-1].time, isAsc);
        case 'triage':
          return compare(this.triageValueMap[a.triage], this.triageValueMap[b.triage], isAsc);
        case 'nextVisit':
          return compare(a.nextCheckupIn, b.nextCheckupIn, isAsc);
        default:
          return 0;

      }
    });


  }

  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {



  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
const SwedishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 till ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} till ${length}`;
}


export function getSwedishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = 'Patienter per sida:';
  paginatorIntl.nextPageLabel = 'Nästa sida';
  paginatorIntl.previousPageLabel = 'Föregående sida';
  paginatorIntl.getRangeLabel = SwedishRangeLabel;
  
  return paginatorIntl;
}