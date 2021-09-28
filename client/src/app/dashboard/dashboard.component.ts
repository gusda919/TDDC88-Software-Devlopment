import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(( result) => {
      if (result.matches) {
        if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
          return [
            { title: 'Patient Overview', contentType: 'text', cols: 2, rows: 1 },
            { title: 'Systolic Blood preassure', contentType: 'line-chart', cols: 2, rows: 1 },
            { title: 'Heart Rate (Pulse)', contentType: 'line-chart', cols: 2, rows: 1 },
            { title: 'Respiratory Rate', contentType: 'line-chart', cols: 2, rows: 1 },
            { title: 'Body Temperature', contentType: 'line-chart', cols: 2, rows: 1 }
          ];
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
          return [
            { title: 'Patient Overview', contentType: 'text', cols: 2, rows: 1 },
            { title: 'Systolic Blood preassure', contentType: 'line-chart', cols: 1, rows: 1 },
            { title: 'Heart Rate (Pulse)', contentType: 'line-chart', cols: 1, rows: 1 },
            { title: 'Respiratory Rate', contentType: 'line-chart', cols: 1, rows: 1 },
            { title: 'Body Temperature', contentType: 'line-chart', cols: 1, rows: 1 }
          ];
        }
        
      }

      return [
        { title: 'Patient Overview', contentType: 'text', cols: 2, rows: 1 },
        { title: 'Systolic Blood preassure', contentType: 'line-chart', cols: 1, rows: 1 },
        { title: 'Heart Rate (Pulse)', contentType: 'line-chart', cols: 1, rows: 2 },
        { title: 'Respiratory Rate', contentType: 'line-chart', cols: 1, rows: 1 },
        { title: 'Body Temperature', contentType: 'line-chart', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}