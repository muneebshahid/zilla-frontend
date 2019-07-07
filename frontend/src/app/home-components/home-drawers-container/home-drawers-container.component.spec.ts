import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDrawersContainerComponent } from './home-drawers-container.component';

describe('HomeDrawersContainerComponent', () => {
  let component: HomeDrawersContainerComponent;
  let fixture: ComponentFixture<HomeDrawersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDrawersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDrawersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
