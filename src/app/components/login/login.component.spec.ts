import { NgxsModule, Store } from '@ngxs/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { User, UserState } from 'src/app/state';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        OverlayModule,
        MaterialModule,
        NgxsModule.forRoot([ UserState ]),
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should user logged in', () => {
    store.dispatch(new User.Login(true));

    const isLoggedIn = store.selectSnapshot(state => state.user.isLoggedIn);
    expect(isLoggedIn).toBe(true);
  });
});
