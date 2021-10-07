import { Component, OnInit } from '@angular/core';


export interface Student {
  firstName:string;
  lastName:string;
  studentEmail:string;

}


const ELEMENT_DATA: Student[] = [
  { firstName: 'Hydrogen', lastName: "1.0079", studentEmail: 'H'},
  { firstName: 'Helium', lastName: "4.0026", studentEmail: 'He'},
  { firstName: 'Lithium', lastName: "6.941", studentEmail: 'Li'},
  { firstName: 'Beryllium', lastName: "9.0122", studentEmail: 'Be'},

];


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
