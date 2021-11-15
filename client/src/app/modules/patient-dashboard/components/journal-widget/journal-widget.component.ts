import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-journal-widget',
  templateUrl: './journal-widget.component.html',
  styleUrls: ['./journal-widget.component.scss']
})
export class JournalWidgetComponent implements OnInit {

  constructor() { }

  @Input() patientId: String;

  ngOnInit(): void {
  }

}
