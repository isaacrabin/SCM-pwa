/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RestockCartComponent } from './restock-cart.component';

describe('RestockCartComponent', () => {
  let component: RestockCartComponent;
  let fixture: ComponentFixture<RestockCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestockCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestockCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
