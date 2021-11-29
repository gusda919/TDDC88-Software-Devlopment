import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordinering',
  templateUrl: './ordinering.component.html',
  styleUrls: ['./ordinering.component.scss']
})
export class OrdineringComponent implements OnInit {


  

  constructor() { }
  @Input() patientId: string;

  ngOnInit(): void {
  }

}
