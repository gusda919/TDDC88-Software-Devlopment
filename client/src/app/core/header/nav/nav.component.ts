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

  messages = [
    {id: 0, patient: 'Test Testsson', pn:"981010-0110",  content: 'Febern har ökat till 43'},
    {id: 1, patient: 'Exempel Sonsson', pn:"911212-0110",content: 'Patienten har svår buksmärta'},
    {id: 2, patient: 'Sven Svensson', pn:"941212-0110",content: 'Blodprov är nu tillgängligt'}
  ]


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

    deleteMessage(i:number) {
      this.messages.forEach((value,index)=>{
        if(value.id == i) this.messages.splice(index,1);
    });
    }

    


  constructor(private breakpointObserver: BreakpointObserver) {}

}
