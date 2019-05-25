import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailOpeningHoursComponent } from './business-detail-opening-hours.component';

describe('BusinessDetailOpeningHoursComponent', () => {
  let component: BusinessDetailOpeningHoursComponent;
  let fixture: ComponentFixture<BusinessDetailOpeningHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailOpeningHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailOpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
