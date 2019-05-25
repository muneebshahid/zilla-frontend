import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailMenuComponent } from './business-detail-menu.component';

describe('BusinessDetailMenuComponent', () => {
  let component: BusinessDetailMenuComponent;
  let fixture: ComponentFixture<BusinessDetailMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
