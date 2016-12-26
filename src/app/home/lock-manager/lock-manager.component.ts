import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { LockManagerTableComponent } from './lock-manager-table.component';

@Component({
  selector: 'lock-manager',
  templateUrl: './lock-manager.component.html'
})
export class LockManagerComponent implements AfterViewInit {
  @Input() data;
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
        console.log(lock);
      })
  }
}
