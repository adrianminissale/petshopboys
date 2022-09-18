import { NgxsModule, Store } from '@ngxs/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { User, UserState } from 'src/app/state';
import { MaterialModule } from 'src/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        NgxsModule.forRoot([ UserState ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PetShopBoys'`, () => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('🐈 PetShopBoys');
  });

  it('should user logged in', () => {
    store.dispatch(new User.Login(true));

    const isLoggedIn = store.selectSnapshot(state => state.user.isLoggedIn);
    expect(isLoggedIn).toBe(true);
  });

  it('should user logged out', () => {
    store.dispatch(new User.Login(false));

    const isLoggedIn = store.selectSnapshot(state => state.user.isLoggedIn);
    expect(isLoggedIn).toBe(false);
  });
});
