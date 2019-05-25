import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreBusinessesComponent } from './explore-businesses.component';

describe('ExploreBusinessesComponent', () => {
  let component: ExploreBusinessesComponent;
  let fixture: ComponentFixture<ExploreBusinessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreBusinessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
