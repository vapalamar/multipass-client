import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { LockManagerTableComponent } from './lock-manager-table.component';

@Component({
  selector: 'lock-manager',
  templateUrl: './lock-manager.component.html'
})
export class LockManagerComponent implements AfterViewInit {
  @Input() set data(value) {
    this.locksTable.data = value;
  };
  @Output() lockDelete = new EventEmitter();
  @Output() lockAdd = new EventEmitter();
  @ViewChild(LockManagerTableComponent) locksTable: LockManagerTableComponent;

  currentLock;

  ngAfterViewInit() {
    this.locksTable.data = this.data;

    this.locksTable.rowSelect
      .subscribe(lock => {
        this.currentLock = lock.data;
      });

    this.locksTable.deleteClick
      .subscribe(lock => {
        this.lockDelete.emit(lock);
      });

    this.locksTable.addClick
      .subscribe(lock => {
        this.lockAdd.emit(lock);
      });
  }

  deleteLock(lock) {
    this.locksTable.source.remove(lock.data);
  }

  addLock(lock) {
    lock.confirm.resolve(lock.newData);
    window.location.reload();
  }
}
