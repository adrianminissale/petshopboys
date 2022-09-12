import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userMessage :string = '';

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let username :any = this.loginForm.value.username;
    let password :any = this.loginForm.value.password;

    this.loginService.getUserLogin(username, password).subscribe((data :any)=>{
      if (data.code !== 200) {
        this.userMessage = 'Username or Password incorrect';
      } else {
        this.dataService.isUserLogged.next(true);
        localStorage.setItem('isUserLogged', 'true');
      }
      console.log(data);
    });
  }
}
