import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchId: any;

  constructor() { }

  @Output() searchcriteria = new EventEmitter<String>();

  searchForPatient() {
    this.searchcriteria.emit(this.searchId);
  }

  ngOnInit(): void {
  }

}
