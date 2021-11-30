import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PatientService } from '../../../core/services/patient.service';
//import { uuid } from 'uuidv4';
 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  date : number  = Date.now();

  menuLabels = ['enhetsöversikt', 'patientsvy']
  menuLinks = ['overview', 'dashboard/198605119885']

  displayMessage = false;
  displayProfile = false;
  panelOpenState = false;
  subscription: Subscription;
  pn: string;
  counter: number = 0;

  messages = [
      {id: 0, patient: 'Test Testsson', pn:"981010-0110",  content: 'Febern har ökat till 43'},
   // {id: 1, patient: 'Exempel Sonsson', pn:"911212-0110",content: 'Patienten har svår buksmärta'},
   // {id: 2, patient: 'Sven Svensson', pn:"941212-0110",content: 'Blodprov är nu tillgängligt'},
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset])
    .pipe(
      map((result: { matches: any; }) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private patientService: PatientService) {

    this.subscription = this.patientService.getPatients().subscribe( (pats: any) => {
      pats.forEach((pat: any) => {
        console.log(pat)
        if (pat.newecg === "true") {
          this.addECGNotification(pat.patientID);
          this.patientService.setPatientNoNewECG2(pat.patientID).subscribe();
        }
        if (pat.newxray === "true") {
          this.addXrayNotification(pat.patientID);
        }
 
      });
    });

  };

  addECGNotification(pn: string) {
    this.patientService.getPatient(pn).subscribe((patient: any) => {
      let fullname = patient.givenName +" "+ patient.familyName;
      this.messages.push({id: this.counter, patient: fullname, pn: pn, content: 'Nytt EKG-resultat tillgängligt'})
      this.counter++;
    });
  }

  addXrayNotification(pn: string) {
    this.patientService.getPatient(pn).subscribe((patient: any) => {
      let fullname = patient.givenName +" "+ patient.familyName;
      this.messages.push({id: this.counter, patient: fullname, pn: pn, content: 'Nytt röntgen-resultat tillgängligt'})
      this.counter++;
    });
  }

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

  getProfile() {
    if(this.displayProfile){
      this.displayProfile = false;
    }
    else {
      this.displayProfile = true;
    }
  }

  ngOnInit(){
  }

}

function c(arg0: RegExp, c: any, arg2: (any: any) => string) {
  throw new Error('Function not implemented.');
}

