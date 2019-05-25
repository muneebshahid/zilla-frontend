import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailDescriptionComponent } from './business-detail-description.component';

describe('BusinessDetailDescriptionComponent', () => {
  let component: BusinessDetailDescriptionComponent;
  let fixture: ComponentFixture<BusinessDetailDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
