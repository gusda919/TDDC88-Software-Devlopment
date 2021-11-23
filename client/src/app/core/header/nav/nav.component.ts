import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PatientService } from '../../../core/services/patient.service';


interface message {
  id: any,
  patient: any,
  pn: string,
  content: any,
}


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit  {

  date : number  = Date.now();

  menuLabels = ['enhetsöversikt', 'dashboard']
  menuLinks = ['overview', 'dashboard/198605119885']

  displayMessage = false;
  displayProfile = false;
  panelOpenState = false;
  subscription: Subscription;
  pn: string;
  
  messages: message[]= []



  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset])
    .pipe(
      map((result: { matches: any; }) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private patientService: PatientService) {
    
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  ;

  ngOnInit (){
    
    (async () => { 
      
      console.log('before delay')
  
      await this.delay(5000);
  
      // Do something after
      console.log('after delay')

      this.subscription = this.patientService.getPatients().subscribe( (pats: any) => {
        pats.forEach((pat: any) => {
          if (pat.newecg === "true") {
            this.addECG(pat.patientID);
            this.addLAB(pat.patientID);
            this.addCHECKUP(pat.patientID);
           // patientService.setPatientNoNewECG(pat.patientID);
          }
        });
      });
  })()
    

  }

  addECG(pn: string) {
    this.patientService.getPatient(pn).subscribe((patient: any) => {
    let fullname = patient.givenName +" "+ patient.familyName;
    this.messages.push({id: this.messages.length, patient: fullname, pn: pn, content: 'Nytt EKG result tillgängligt'})
    });
  };

  addLAB(pn: string) {
    this.patientService.getPatient(pn).subscribe((patient: any) => {
    let fullname = patient.givenName +" "+ patient.familyName;
    this.messages.push({id: this.messages.length, patient: fullname, pn: pn, content: 'Nytt prov result tillgängligt'})
    });
  };

  addCHECKUP(pn: string) {
    this.patientService.getPatient(pn).subscribe((patient: any) => {
    let fullname = patient.givenName +" "+ patient.familyName;
    this.messages.push({id: this.messages.length, patient: fullname, pn: pn, content: 'Ny remiss tillagd'})
    });
  };

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

}
