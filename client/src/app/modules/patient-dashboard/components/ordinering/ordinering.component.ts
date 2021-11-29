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

  showMore(){
    document.getElementById("wrapper-base")!.style.display = "none";
    document.getElementById("wrapper-extended")!.style.display = "block";
  }
  showHistory(){

    document.getElementById("wrapper-base")!.style.display = "none";
    document.getElementById("wrapper-history")!.style.display = "block";
  }
  showLess(){

    document.getElementById("wrapper-base")!.style.display = "block";
    document.getElementById("wrapper-extended")!.style.display = "none";
    document.getElementById("wrapper-history")!.style.display = "none"
  }
 

}
