import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  date : number  = Date.now();
  menuItems = ['overview', 'dashboard', 'employees']
  displayMessage = false;
  panelOpenState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    getMessages() {
      if(this.displayMessage) {
        this.displayMessage = false;
      } else {
        this.displayMessage = true;
      }
    }

  constructor(private breakpointObserver: BreakpointObserver) {}



}
