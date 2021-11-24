import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-referral-table',
  templateUrl: './referral-table.component.html',
  styleUrls: ['./referral-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})
export class ReferralTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ReferralTableItem>;
  dataSource: MatTableDataSource<ReferralTableItem> = new MatTableDataSource<ReferralTableItem>();
  expandedElement : ReferralTableItem | null;
  @Input() patientId: string;  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date','updated', 'type', 'unit', 'answered'];
  

  constructor() {    
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.getPatientReferrals();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getPatientReferrals() {
    if (this.patientId=='195001232296') {
      let data: ReferralTableItem[] = [ 
        {date: "2021-11-15 13:21", updated: "2021-11-16 08:31", type: "Remiss 1", unit: "Enhet 1", answered: "2021-11-17 15:26", description: "Utförlig information 1"},
        {date: "2021-11-16 13:20", updated: "2021-11-17 08:32", type: "Remiss 2", unit: "Enhet 2", answered: "2021-11-18 15:27", description: "Utförlig information 2"},
        {date: "2021-11-17 13:22", updated: "2021-11-18 08:33", type: "Remiss 3", unit: "Enhet 3", answered: "2021-11-19 15:28", description: "Utförlig information 3"},
        {date: "2021-11-18 13:23", updated: "2021-11-19 08:34", type: "Remiss 4", unit: "Enhet 4", answered: "2021-11-20 15:29", description: "utförlig information 4"},
      ];
      return data;
    } else if (this.patientId=='198605119885') {
      let data: ReferralTableItem[] = [ 
        {date: "2021-11-15 13:21", updated: "2021-11-16 08:31", type: "Remiss 1", unit: "Enhet 1", answered: "2021-11-17 15:26", description: "Utförlig information 1"},
        {date: "2021-11-16 13:20", updated: "2021-11-17 08:32", type: "Remiss 2", unit: "Enhet 2", answered: "2021-11-18 15:27", description: "Utförlig information 2"},
        {date: "2021-11-17 13:22", updated: "2021-11-18 08:33", type: "Remiss 3", unit: "Enhet 3", answered: "2021-11-19 15:28", description: "Utförlig information 3"},
        {date: "2021-11-18 13:23", updated: "2021-11-19 08:34", type: "Remiss 4", unit: "Enhet 4", answered: "2021-11-20 15:29", description: "utförlig information 4"},
      ];
      return data;
    } else if (this.patientId=='194202269207') {
      let data: ReferralTableItem[] = [ 
        {date: "2021-11-15 13:21", updated: "2021-11-16 08:31", type: "Remiss 1", unit: "Enhet 1", answered: "2021-11-17 15:26", description: "Utförlig information 1"},
        {date: "2021-11-16 13:20", updated: "2021-11-17 08:32", type: "Remiss 2", unit: "Enhet 2", answered: "2021-11-18 15:27", description: "Utförlig information 2"},
        {date: "2021-11-17 13:22", updated: "2021-11-18 08:33", type: "Remiss 3", unit: "Enhet 3", answered: "2021-11-19 15:28", description: "Utförlig information 3"},
        {date: "2021-11-18 13:23", updated: "2021-11-19 08:34", type: "Remiss 4", unit: "Enhet 4", answered: "2021-11-20 15:29", description: "utförlig information 4"},
      ];
      return data;
    } else {
      let data: ReferralTableItem[] = [];
      return data;
    }
  }

}

export interface ReferralTableItem {
  date: string;
  updated: string;
  type: string;
  unit: string;
  answered: string;
  description : string;
}

  


