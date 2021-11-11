import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// ActivatedRoute and ParamMap used for injecting patientID into page
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

  patientId: string;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(( result) => {
      if (result.matches) {
        if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
          return [
            { title: 'Patient Overview', contentType: 'text', cols: 2, rows: 1 },
            { title: 'Journal', contentType: 'journal', cols: 2, rows: 1 },
            { title: 'Systolic Blood preassure', contentType: 'line-chart', cols: 2, rows: 1 },
            { title: 'Heart Rate (Pulse)', contentType: 'line-chart', cols: 2, rows: 1 },
            { title: 'Respiratory Rate', contentType: 'line-chart', cols: 2, rows: 1 },
            { title: 'Body Temperature', contentType: 'line-chart', cols: 2, rows: 1 },
            { title: 'Silhouette', contentType: 'img', cols: 1, rows: 1 ,}
          ];
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
          return [
            { title: 'Patient Overview', contentType: 'text', cols: 2, rows: 1 },
            { title: 'Journal', contentType: 'journal', cols: 2, rows: 1 },
            { title: 'Systolic Blood preassure', contentType: 'line-chart', cols: 1, rows: 1 },
            { title: 'Heart Rate (Pulse)', contentType: 'line-chart', cols: 1, rows: 1 },
            { title: 'Respiratory Rate', contentType: 'line-chart', cols: 1, rows: 1 },
            { title: 'Body Temperature', contentType: 'line-chart', cols: 1, rows: 1 },
            { title: 'Silhouette', contentType: 'img', cols: 1, rows: 1 ,}
          ];
        }
        
      }

      return [
        { title: 'Patient Overview', contentType: 'text', cols: 2, rows: 1 },
        { title: 'Journal', contentType: 'journal', cols: 2, rows: 1 },
        { title: 'Systolic Blood preassure', contentType: 'line-chart', cols: 1, rows: 1 },
        { title: 'Heart Rate (Pulse)', contentType: 'line-chart', cols: 1, rows: 2 },
        { title: 'Respiratory Rate', contentType: 'line-chart', cols: 1, rows: 1 },
        { title: 'Body Temperature', contentType: 'line-chart', cols: 1, rows: 1 },
        { title: 'Silhouette', contentType: 'img', cols: 1, rows: 1 ,}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) {}

  ngOnInit() {

    // subscribe to route parameters to get param patientID
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('patientID') || "";
      console.log(this.patientId);
    });

  }


}