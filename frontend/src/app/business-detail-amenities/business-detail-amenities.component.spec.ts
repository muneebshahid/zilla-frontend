import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailAmenitiesComponent } from './business-detail-amenities.component';

describe('BusinessDetailAmenitiesComponent', () => {
  let component: BusinessDetailAmenitiesComponent;
  let fixture: ComponentFixture<BusinessDetailAmenitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailAmenitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
