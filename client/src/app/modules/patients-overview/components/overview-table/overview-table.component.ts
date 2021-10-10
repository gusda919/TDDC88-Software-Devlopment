import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OverviewTableDataSource } from './overview-table-datasource';

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
  dataSource: OverviewTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['issue', 'name', 'date','priority'];
  groupedColumns =['header'];

  constructor(private patientService: PatientService) {
    this.dataSource = new OverviewTableDataSource(patientService);

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.table = this.table;
    this.table.dataSource = this.dataSource;
    
  }
}
