import { Pets, PetsState } from 'src/app/state';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        OverlayModule,
        MaterialModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([ PetsState ]),
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should status be available', () => {
    store.dispatch(new Pets.Status('available'));

    const status = store.selectSnapshot(state => state.pets.status);
    expect(status).toBe('available');
  });

  it('should search have pets', () => {
    const pets: any = [{
      id: 9223372016900018000,
      category: {
        id: 0,
        name: 'string'
      },
      name: 'fish',
      photoUrls: [
        'string'
      ],
      tags: [
        {
          id: 0,
          name: 'string'
        }
      ],
      status: 'available'
    }];
    store.dispatch(new Pets.Search(pets));

    const search = store.selectSnapshot(state => state.pets.pets);
    expect(search.length).toBeGreaterThan(0);
  });
});
