import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MHomeMenuDrawerComponent } from './m-home-menu-drawer.component';

describe('MHomeMenuDrawerComponent', () => {
  let component: MHomeMenuDrawerComponent;
  let fixture: ComponentFixture<MHomeMenuDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MHomeMenuDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MHomeMenuDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
