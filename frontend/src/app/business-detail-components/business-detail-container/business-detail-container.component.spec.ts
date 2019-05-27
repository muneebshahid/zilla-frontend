import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailContainerComponent } from './business-detail-container.component';

describe('BusinessDetailContainerComponent', () => {
  let component: BusinessDetailContainerComponent;
  let fixture: ComponentFixture<BusinessDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
