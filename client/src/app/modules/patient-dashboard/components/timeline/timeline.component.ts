import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  
  displayedEvent: any = {};

  events: any = [
    {
      "date": "2021-01-20",
      "time": "18:05",
      "description": "Fick en smörmåg och kaffe"
    },
    {
      "date": "2021-01-21",
      "time": "14:05",
      "description": "Provresultat kom tillbaka"
    },
    {
      "date": "2021-01-21",
      "time": "16:05",
      "description": "Skickades till röntgen för att ta bilder"
    },
    {
      "date": "2021-01-22",
      "time": "18:05",
      "description": "Blev utskriven från avdelningen"
    },
    {
      "date": "2021-01-22",
      "time": "18:05",
      "description": "Blev utskriven från avdelningen"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  displayEvent(event: any) {
    this.displayedEvent = event;
  }

}
