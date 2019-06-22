import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningClosingHoursComponent } from './opening-closing-hours.component';

describe('OpeningClosingHoursComponent', () => {
  let component: OpeningClosingHoursComponent;
  let fixture: ComponentFixture<OpeningClosingHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningClosingHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningClosingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
