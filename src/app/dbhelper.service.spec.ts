import { TestBed } from '@angular/core/testing';

import { DBHelperService } from './dbhelper.service';

describe('DBHelperService', () => {
  let service: DBHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
