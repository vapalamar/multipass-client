import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ng2-bootstrap/modal';

import { HomeComponent }   from './home.component';
import { LockManagerTableComponent } from './lock-manager/lock-manager-table.component';
import { LockManagerComponent } from './lock-manager/lock-manager.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    Ng2SmartTableModule,
    ModalModule.forRoot()
  ],
  exports: [
    HomeComponent,
    LockManagerComponent,
    LockManagerTableComponent
  ],
  declarations: [
    HomeComponent,
    LockManagerComponent,
    LockManagerTableComponent
  ],
  providers: [],
})
export class HomeModule { }
