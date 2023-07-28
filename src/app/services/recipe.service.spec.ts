import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [RecipeService, {
        provide: HttpClient, useValue: httpClientSpy
      }
      ]
    });

    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
