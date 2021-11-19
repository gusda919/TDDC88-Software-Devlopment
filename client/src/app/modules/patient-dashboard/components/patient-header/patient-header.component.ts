import { Component, Input, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { PatientService } from '../../../../core/services/patient.service';
import { Subscription } from 'rxjs';
import { NavComponent } from '../../../../core/header/nav/nav.component';
import {MatDialog} from '@angular/material/dialog';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { CarouselModule, WavesModule } from 'angular-bootstrap-md'


let imageSource: string;

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
})

export class PatientHeaderComponent implements OnInit{
    //change this to dynamically change with real test data later
    name = "";
    
    ecgOpen = false;

    @Input()
    patientId: string = "";

    triage = "gul";
    contagious: boolean;
    visitingFor = "";
    gender = "";
    subscription: Subscription;
    imageSource: string;
    htmlToAdd: string;
    ECGImages: number;
  constructor(private patientService: PatientService) {

    this.subscription = this.patientService.getPatientContagious(this.patientId).subscribe( (cont: any) => 
    (this.contagious = (cont ==="true") )); 

  }

  ImageExist(url: string) 
  {
     var img = new Image();
     img.src = url;
     return img.height != 0;
  }
  ngOnInit(){

    this.patientService.getPatient(this.patientId).subscribe( (cont: any) => {
      this.name = cont.givenName + " " + cont.familyName,
      this.triage = cont.triage,
      this.contagious = cont.contagious ==="true",
      this.visitingFor = cont.description.substr(cont.description.indexOf(" ") + 1).charAt(0).toUpperCase() + cont.description.substr(cont.description.indexOf(" ") + 1).slice(1),
      this.gender = cont.gender.charAt(0).toUpperCase() + cont.gender.slice(1)
      this.updateTriageColor();
    });

  }


  openRoS(pn: string) {
    console.log("Open RoS for " + pn);
  }

  updateTriageColor(){
    let triageColor = document.getElementById('triageColor')
    triageColor?.setAttribute('style', 'background-color: ' + this.triage);
  }

   hideImg() {

   }

 

   openECGModal(patientId: string) {

    this.ECGImages = 1;
    while (this.ImageExist('/assets/ECG' + this.patientId + '_'+ this.ECGImages + '.png')) {
      console.log('ECGimg'+this.ECGImages)
     // this.htmlToAdd = '<img class="modal-content" id="ECGimg1" onerror="hideImg()"><img class="modal-content" id="ECGimg2" onerror="hideImg()">';
      document.getElementById('ECGimg'+this.ECGImages)?.setAttribute('alt', 'Ingen EKG hittades för patient med personnummer ' + this.patientId );
      document.getElementById('ECGimg'+this.ECGImages)?.setAttribute('src', '/assets/ECG' + this.patientId + '_'+ this.ECGImages + '.png');
      //let imagesModal = document.getElementById('imagesModal')
     // imagesModal?.innerHTML = imagesModal?.innerHTML + "hej"
     
      console.log(this.ECGImages);
      this.ECGImages= this.ECGImages+1;
    }

    let modal = document.getElementById("myModal");
    modal?.style.setProperty("display", "block")
    
    document.getElementById('outer-wrapper-id')?.style.setProperty('opacity', '0.7');
    document.getElementById('sidenav-id')?.style.setProperty('opacity', '0.2');
  }

  closeECGModal() {
    console.log("closing")
    let modal = document.getElementById("myModal");
    modal?.style.setProperty("display", "none")

    document.getElementById('outer-wrapper-id')?.style.setProperty('opacity', '1');
    document.getElementById('sidenav-id')?.style.setProperty('opacity', '1');
  }
  
}


