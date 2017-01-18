import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Observable } from 'rxjs';
import { LockManagerComponent } from './lock-manager/lock-manager.component';
import { LockManagerService } from './lock-manager/lock-manager.service';

interface UserData {
  name: string,
  keys?: Array<any>,
  locks?: Array<any>
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild('staticModal') modal: ModalDirective;
  @ViewChild(LockManagerComponent) lockManager: LockManagerComponent;
  private currentLock;
  private userData: UserData = <UserData>Object();

  constructor(private service: LockManagerService) {
    this.userData.name = JSON.parse(localStorage.getItem('currentUser')).nickname;
  }

  ngOnInit() {
    const { name } = this.userData;

    Observable.forkJoin(
      this.service.getUserKeys(name),
      this.service.getUserLocks(name)
    ).subscribe(data => {
      this.userData.keys = data[0];
      this.userData.locks = data[1];
    });
  }

  onLockDelete(lock) {
    this.currentLock = lock;
    this.modal.show();
  }

  onLockAdd(lock) {
    this.service.addLock(
        this.userData.name, lock.newData._id, lock.newData.description, lock.newData.trusted.split(' ')
      )
      .subscribe(_ => {
        this.lockManager.addLock(lock);
      });
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
