import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  user = {
    name: 'Taisia',
    keyLockData: [
      {
        key: {
          id: 1
        },
        locks: [
          {
            id: 1,
            name: 'Car',
            users: 'Bret'
          },
          {
            id: 2,
            name: 'Door',
            users: 'Antonette'
          },
          {
            id: 11,
            name: 'Bike',
            users: 'Nicholas, Stanton'
          }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit() { }
}
