import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailHeaderGalleryComponent } from './business-detail-header-gallery.component';

describe('BusinessDetailHeaderGalleryComponent', () => {
  let component: BusinessDetailHeaderGalleryComponent;
  let fixture: ComponentFixture<BusinessDetailHeaderGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailHeaderGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailHeaderGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
