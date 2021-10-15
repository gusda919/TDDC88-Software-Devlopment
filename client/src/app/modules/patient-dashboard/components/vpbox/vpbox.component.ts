import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpbox',
  templateUrl: './vpbox.component.html',
  styleUrls: ['./vpbox.component.scss'],
})
export class VpboxComponent implements OnInit {
  params = [
    { icon: 'folder', name: 'Pulse', value: '97 bpm', isGraphDisplayed: false },
    {
      icon: 'folder',
      name: 'Blood Pressure',
      value: '140/65 mmHg',
      isGraphDisplayed: false,
    },
    { icon: 'folder', name: 'Temp.', value: '39°C', isGraphDisplayed: false },
    {
      icon: 'folder',
      name: 'Resp.-rate',
      value: '32 / min',
      isGraphDisplayed: false,
    },
    { icon: 'folder', name: 'SpO2', value: '96%', isGraphDisplayed: false },
    {
      icon: 'folder',
      name: 'Hydration',
      value: 'normal',
      isGraphDisplayed: false,
    },
    {
      icon: 'folder',
      name: 'Consciousness',
      value: 'C',
      isGraphDisplayed: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  isDisplay = false;

  print(param: any) {
    //Kod som ser till att enbart en graf kan visas samtidigt, tas
    //stycket nedan bort kan man visa flera grafer samtidigt
    if (!param.isGraphDisplayed) {
      for (let i = 0; i < this.params.length; i++) {
        if (this.params[i].isGraphDisplayed) {
          this.params[i].isGraphDisplayed = false;
        }
      }
    }

    //
    param.isGraphDisplayed = !param.isGraphDisplayed;
  }
}
