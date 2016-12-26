import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { LockManagerComponent } from './lock-manager/lock-manager.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild('staticModal') modal: ModalDirective;
  @ViewChild(LockManagerComponent) lockManager: LockManagerComponent;
  private currentLock;

  user = {
    firstName: 'Taisia',
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.data);
  }

  onLockDelete(lock) {
    this.currentLock = lock;
    this.modal.show();
  }

  onLockDeleteConfirm() {
    this.lockManager.deleteLock(this.currentLock);
    this.currentLock = null;

    this.modal.hide();
  }

  onLockDeleteCancel() {
    this.currentLock = null;
    this.modal.hide();
  }
}
