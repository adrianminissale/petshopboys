import { UserState } from '../../state/index';
import { NgxsModule } from '@ngxs/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [ NgxsModule.forRoot([ UserState]) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PetShopBoys'`, () => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('🐈 PetShopBoys');
  });
});
