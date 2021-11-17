import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface NotesTableItem {
  date : string;
  note_type: string;
  noted_by: string;
  unit: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: NotesTableItem[] = [
  {date: "2021-11-15 14:00", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen"},
  {date: "2021-11-15 14:20", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen"},
  {date: "2021-11-14 14:30", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen"},
  {date: "2021-11-13 14:50", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen"},
  {date: "2021-11-12 14:40", note_type: 'Hydrogen', noted_by: "Helena Pettersson", unit: "Vaccinationsmottagningen"},
];

/**
 * Data source for the NotesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class NotesTableDataSource extends DataSource<NotesTableItem> {
  data: NotesTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<NotesTableItem[]> {
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
  private getPagedData(data: NotesTableItem[]): NotesTableItem[] {
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
  private getSortedData(data: NotesTableItem[]): NotesTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'note_type': return compare(a.note_type, b.note_type, isAsc);
        case 'noted_by': return compare(a.noted_by, b.noted_by, isAsc);
        case 'unit': return compare(a.unit, b.unit, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
