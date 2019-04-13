import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormPage } from './search-form.page';

describe('SearchFormPage', () => {
  let component: SearchFormPage;
  let fixture: ComponentFixture<SearchFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
