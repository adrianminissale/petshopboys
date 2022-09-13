import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store } from "@ngxs/store";
import { User } from 'src/app/state';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    let username :any = this.loginForm.value.username;
    let password :any = this.loginForm.value.password;

    this.loginService.getUserLogin(username, password).subscribe({
      next: (data :any) => {
        if (data.code !== 200) {
          this.snackBar.open('Username or Password incorrect!', '😢')
        } else {
          this.store.dispatch(new User.Login(true));
          localStorage.setItem('isUserLogged', 'true');
        }
      },
      error: (e) => {
        console.error(e);
        this.snackBar.open('Something is wrong, try again later!', '😢');
      },
    });
  }
}
