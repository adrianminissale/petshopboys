import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { UserState } from 'src/app/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isUserLogged!: boolean;
  private isLoggedIn$ = this.store.select(UserState.isLoggedIn);

  constructor(
    private store: Store
  ) {
    this.isLoggedIn$.subscribe( value => {
      this.isUserLogged = value;
    });
  }

  ngOnInit(): void {}

}
