import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ReferralTableItem {
  date: string;
  updated: string;
  type: string;
  unit: string;
  answered: string;
}




// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: ReferralTableItem[] = [ 
  {date: "2021-11-15 13:21", updated: "2021-11-16 08:31", type: "Remiss", unit: "Enhet1", answered: "2021-11-17 15:26"},
  {date: "2021-11-16 13:20", updated: "2021-11-17 08:32", type: "Remiss", unit: "Enhet2", answered: "2021-11-18 15:27"},
  {date: "2021-11-17 13:22", updated: "2021-11-18 08:33", type: "Remiss", unit: "Enhet3", answered: "2021-11-19 15:28"},
  {date: "2021-11-18 13:23", updated: "2021-11-19 08:34", type: "Remiss", unit: "Enhet4", answered: "2021-11-20 15:29"},
  
];*/

/**
 * Data source for the ReferralTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class ReferralTableDataSource extends DataSource<ReferralTableItem> {
  
  data: ReferralTableItem[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  patientId: string;
  
  constructor(patientId: string) {
    super();
    this.patientId = patientId;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ReferralTableItem[]> {
    this.data = this.getPatientReferrals();
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ReferralTableItem[]): ReferralTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ReferralTableItem[]): ReferralTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'updated': return compare(a.updated, b.updated, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'unit': return compare(a.unit, b.unit, isAsc);
        case 'answered': return compare(a.answered, b.answered, isAsc);
        default: return 0;
      }
    });
  }

  getPatientReferrals() {
    if (this.patientId=='195001232296') {
      let data: ReferralTableItem[] = [ 
        {date: "2021-11-15 13:21", updated: "2021-11-16 08:31", type: "Remiss", unit: "Enhet1", answered: "2021-11-17 15:26"},
        {date: "2021-11-16 13:20", updated: "2021-11-17 08:32", type: "Remiss", unit: "Enhet2", answered: "2021-11-18 15:27"},
        {date: "2021-11-17 13:22", updated: "2021-11-18 08:33", type: "Remiss", unit: "Enhet3", answered: "2021-11-19 15:28"},
        {date: "2021-11-18 13:23", updated: "2021-11-19 08:34", type: "Remiss", unit: "Enhet4", answered: "2021-11-20 15:29"},
      ];
      return data;
    } else if (this.patientId=='198605119885') {
      let data: ReferralTableItem[] = [ 
        {date: "2021-11-15 13:21", updated: "2021-11-16 08:31", type: "Remiss", unit: "Enhet1", answered: "2021-11-17 15:26"},
        {date: "2021-11-16 13:20", updated: "2021-11-17 08:32", type: "Remiss", unit: "Enhet2", answered: "2021-11-18 15:27"},
        {date: "2021-11-17 13:22", updated: "2021-11-18 08:33", type: "Remiss", unit: "Enhet3", answered: "2021-11-19 15:28"},
        {date: "2021-11-18 13:23", updated: "2021-11-19 08:34", type: "Remiss", unit: "Enhet4", answered: "2021-11-20 15:29"},
      ];
      return data;
    } else if (this.patientId=='194202269207') {
      let data: ReferralTableItem[] = [ 
        {date: "2021-11-15 13:21", updated: "2021-11-16 08:31", type: "Remiss", unit: "Enhet1", answered: "2021-11-17 15:26"},
        {date: "2021-11-16 13:20", updated: "2021-11-17 08:32", type: "Remiss", unit: "Enhet2", answered: "2021-11-18 15:27"},
        {date: "2021-11-17 13:22", updated: "2021-11-18 08:33", type: "Remiss", unit: "Enhet3", answered: "2021-11-19 15:28"},
        {date: "2021-11-18 13:23", updated: "2021-11-19 08:34", type: "Remiss", unit: "Enhet4", answered: "2021-11-20 15:29"},
      ];
      return data;
    } else {
      let data: ReferralTableItem[] = [];
      return data;
    }
  }


}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
