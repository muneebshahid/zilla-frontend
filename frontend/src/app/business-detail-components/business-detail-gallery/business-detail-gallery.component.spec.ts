import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailGalleryComponent } from './business-detail-gallery.component';

describe('BusinessDetailGalleryComponent', () => {
  let component: BusinessDetailGalleryComponent;
  let fixture: ComponentFixture<BusinessDetailGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
