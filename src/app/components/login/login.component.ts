import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userMessage! :string;
  public loginForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private loginService: LoginService
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
          this.userMessage = 'Username or Password incorrect';
        } else {
          this.dataService.isUserLogged.next(true);
          localStorage.setItem('isUserLogged', 'true');
        }
      },
      error: (e) => {
        console.error(e);
        this.userMessage = 'Something is wrong, try again later!';
      },
    });
  }
}
