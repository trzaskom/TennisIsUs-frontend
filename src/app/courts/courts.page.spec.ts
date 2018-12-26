import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsPage } from './courts.page';

describe('CourtsPage', () => {
  let component: CourtsPage;
  let fixture: ComponentFixture<CourtsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
