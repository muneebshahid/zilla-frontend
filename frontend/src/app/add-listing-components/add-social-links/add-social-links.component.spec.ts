import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialLinksComponent } from './add-social-links.component';

describe('AddSocialLinksComponent', () => {
  let component: AddSocialLinksComponent;
  let fixture: ComponentFixture<AddSocialLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSocialLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
