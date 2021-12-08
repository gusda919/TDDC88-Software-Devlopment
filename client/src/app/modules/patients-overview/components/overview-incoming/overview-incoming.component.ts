import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/shared/models/patient';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-overview-incoming',
  templateUrl: './overview-incoming.component.html',
  styleUrls: ['./overview-incoming.component.scss']
})
export class OverviewIncomingComponent implements AfterViewInit {
  @Input() patientId: string;
  
  constructor() {
    
  }
 
  ngAfterViewInit(): void {

    setTimeout(() => {
      this.dataSource.data = this.getPatientNotes();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 0)
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IncomingPatient>;
  dataSource : MatTableDataSource<IncomingPatient> = new MatTableDataSource<IncomingPatient>();

  
  displayedColumns = ['issue', 'gender', 'name', 'id', 'arrival', 'currentsituation', 'triage'];

  groupedColumns = ['header'];
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

  getPatientNotes() {
    
      let data: IncomingPatient[] = [      
        {issue: "Hjärtinfarkt", gender: 'Man', name: "Bosse Bossesson", id: "197203143274", arrival: "14:45", currentsituation: "Irregulär puls, avsvimmad, svag andning, HLR utförs", triage: "red"}
        
        
      ];
      
      return data;
    
      
    }
  }


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function SwedishRangeLabel(page: number, pageSize: number, length: number) {
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

export interface IncomingPatient {
  issue : string;
  gender: string;
  id: string;
  currentsituation: string;
  arrival: string;
  name: string;
  triage : string;
  
}

