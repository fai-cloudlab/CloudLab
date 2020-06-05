import { TestBed } from '@angular/core/testing';

import { CloudLabApiService } from './cloud-lab-api.service';

describe('CloudLabApiService', () => {
  let service: CloudLabApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudLabApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
