import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailMapComponent } from './business-detail-map.component';

describe('BusinessDetailMapComponent', () => {
  let component: BusinessDetailMapComponent;
  let fixture: ComponentFixture<BusinessDetailMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
