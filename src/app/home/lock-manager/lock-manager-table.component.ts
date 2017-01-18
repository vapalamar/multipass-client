import { Component, EventEmitter, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'lock-manager-table',
  templateUrl: './lock-manager-table.component.html'
})
export class LockManagerTableComponent {
  @Output() rowSelect = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Output() addClick = new EventEmitter();

  source: LocalDataSource;

  settings = {
    columns: {
      _id: {
        title: 'ID'
      },
      description: {
        title: 'Description'
      },
      trusted: {
        title: 'Lock Users'
      }
    },
    add: {
      confirmCreate: true
    },
    delete: {
      confirmDelete: true
    },
    actions: {
      edit: false
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
