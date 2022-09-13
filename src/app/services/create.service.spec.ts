import { DataService } from 'src/app/services/data.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreateService } from './create.service';

describe('CreateService', () => {
  let service: CreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(CreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
