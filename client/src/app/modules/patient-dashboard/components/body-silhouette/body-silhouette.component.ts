import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-body-silhouette',
  templateUrl: './body-silhouette.component.html',
  styleUrls: ['./body-silhouette.component.scss']
})
export class BodySilhouetteComponent implements OnInit {

  @Input() patientId: String; 

  constructor() { }

  ngOnInit(): void {
  }

}
 