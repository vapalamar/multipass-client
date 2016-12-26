import { Component, EventEmitter, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'lock-manager-table',
  templateUrl: './lock-manager-table.component.html'
})
export class LockManagerTableComponent {
  @Output() rowSelect = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  source: LocalDataSource;

  settings = {
    columns: {
      name: {
        title: 'For'
      },
      users: {
        title: 'Lock Users'
      }
    },
    delete: {
      confirmDelete: true
    }
  };

  private _data;

  set data(val) {
    this._data = val;
    this.source = new LocalDataSource(val);
  }

  get data() {
    return this._data;
  }
}
