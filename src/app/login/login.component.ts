import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../auth/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  newModel: any = {};
  loading = false;
  existingUser = true;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(res => {
        if (res === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect.';
          this.loading = false;
        }
      });
  }

  signUp() {
    this.loading = true;
    this.authService.signUp(
        this.newModel.firstName, this.newModel.lastName, this.newModel.email, this.newModel.username, this.newModel.password
      )
      .subscribe(res => {
        if (res === true) {
          this.existingUser = true;
          this.loading = false;
        } else {
          this.error = 'Incorrect data, please try again.';
          this.loading = false;
        }
      });
  }
}
