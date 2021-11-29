import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PatientService } from '../../../core/services/patient.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  date : number  = Date.now();

  menuLabels = ['enhetsöversikt', 'patientsvy']
  menuLinks = ['overview', 'dashboard/198605119885']

  patientIds: string[] = [];
  content: string[] = [];

  displayMessage = false;
  displayProfile = false;
  panelOpenState = false;
  subscription: Subscription;
  pn: string;

  messages = [
    {id: 0, patient: 'Test Testsson', pn:"981010-0110",  content: 'Febern har ökat till 43'},
    {id: 1, patient: 'Exempel Sonsson', pn:"911212-0110",content: 'Patienten har svår buksmärta'},
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset])
    .pipe(
      map((result: { matches: any; }) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private patientService: PatientService) {

    this.subscription = this.patientService.getPatients().subscribe( (pats: any) => {
      pats.forEach((pat: any) => {
        if (pat.newecg === "true") {
          this.addECG(pat.patientID);
         // patientService.setPatientNoNewECG(pat.patientID);
        }
        this.patientIds.push(pat.patientID);
      });
      console.log(this.patientIds);
    });

  };

  addECG(pn: string) {
    this.patientService.getPatient(pn).subscribe((patient: any) => {
    let fullname = patient.givenName +" "+ patient.familyName;
    this.messages.push({id: this.messages.length, patient: fullname, pn: pn, content: 'Nytt EKG result tillgängligt'})
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

  searchForPatient(data: any) {
    this.content = this.patientIds;
    if (data) {
      this.content = this.content.filter(function (ele, i, array) {
        let arrayelement = ele.toLowerCase();
        return arrayelement.includes(data);
      })
    }
    else {
      console.log(this.content);
    }
    console.log(this.content);
  }

}

