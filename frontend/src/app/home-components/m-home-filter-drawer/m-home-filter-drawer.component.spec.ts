import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MHomeFilterDrawerComponent } from './m-home-filter-drawer.component';

describe('MHomeFilterDrawerComponent', () => {
  let component: MHomeFilterDrawerComponent;
  let fixture: ComponentFixture<MHomeFilterDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MHomeFilterDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MHomeFilterDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
