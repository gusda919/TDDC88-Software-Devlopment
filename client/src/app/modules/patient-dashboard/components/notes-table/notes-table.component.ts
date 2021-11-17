import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NotesTableDataSource, NotesTableItem } from './notes-table-datasource';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.scss']
})
export class NotesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<NotesTableItem>;
  dataSource: NotesTableDataSource;
  @Input() patientId: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'note_type', 'noted_by','unit'];

  constructor() {
  }

  ngAfterViewInit(): void {
    this.dataSource = new NotesTableDataSource(this.patientId);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
