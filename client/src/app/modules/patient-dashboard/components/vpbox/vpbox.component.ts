import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpbox',
  templateUrl: './vpbox.component.html',
  styleUrls: ['./vpbox.component.scss'],
})
export class VpboxComponent implements OnInit {
  params = [
    { icon: 'folder', name: 'Pulse', value: '97 bpm' },
    { icon: 'folder', name: 'Blood Pressure', value: '140/65 mmHg' },
    { icon: 'folder', name: 'Temp.', value: '39°C' },
    { icon: 'folder', name: 'Resp.-rate', value: '32 / min' },
    { icon: 'folder', name: 'SpO2', value: '96%' },
    { icon: 'folder', name: 'Hydration', value: 'normal' },
    { icon: 'folder', name: 'Consciousness', value: 'C' },
  ];

  constructor() {}

  ngOnInit(): void {}

  isDisplay = false;

  print(param: any) {
    console.log(param);
    this.isDisplay = !this.isDisplay;
  }
}
