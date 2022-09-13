import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { User, UserState } from 'src/app/state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public isUserLogged: boolean = false;
  public isLoggedIn = this.store.select(UserState.isLoggedIn);
  public title :string = '🐈 PetShopBoys';

  constructor(
    private store: Store
  ) {
    this.isLoggedIn.subscribe( value => {
      this.isUserLogged = value;
    });
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('isUserLogged') &&
      localStorage.getItem('isUserLogged') === 'true'
    ) {
      this.store.dispatch(new User.Login(true));
    }
  }

  logout(): void {
    localStorage.setItem('isUserLogged', 'false');
    this.store.dispatch(new User.Login(false));
  }
}
