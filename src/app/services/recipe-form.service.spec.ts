import { TestBed } from '@angular/core/testing';

import { RecipeFormService } from './recipe-form.service';

describe('RecipeFormService', () => {
  let service: RecipeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
