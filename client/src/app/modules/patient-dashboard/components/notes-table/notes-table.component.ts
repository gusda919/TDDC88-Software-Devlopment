import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})
export class NotesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<NotesTableItem>;
  expandedElement : NotesTableItem | null;
  dataSource : MatTableDataSource<NotesTableItem> = new MatTableDataSource<NotesTableItem>();
  
  @Input() patientId: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'note_type', 'noted_by','unit'];


  constructor() {
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.getPatientNotes();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getPatientNotes() {
    if (this.patientId=='195001232296') {
      let data: NotesTableItem[] = [
        {date: "2021-11-15 14:00", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-15 14:20", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-14 14:30", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-13 14:50", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-12 14:40", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
      ];
      return data;
    } else if (this.patientId=='198605119885') {
      let data: NotesTableItem[] = [
        {date: "2021-11-15 14:00", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-15 14:20", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-14 14:30", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-13 14:50", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-12 14:40", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
      ];
      return data;
    } else if (this.patientId=='194202269207') {
      let data: NotesTableItem[] = [
        {date: "2021-11-15 14:00", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-15 14:20", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-14 14:30", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-13 14:50", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
        {date: "2021-11-12 14:40", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen", description: "hejhejehj"},
      ];
      return data;
    } else {
      let data: NotesTableItem[] = [];
      return data;
    }
  }


}

export interface NotesTableItem {
  date : string;
  note_type: string;
  noted_by: string;
  unit: string;
  description : string;
  
}

