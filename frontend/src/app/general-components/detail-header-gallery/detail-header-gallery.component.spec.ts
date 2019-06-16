import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailHeaderGalleryComponent } from "./detail-header-gallery.component";

describe("DetailHeaderGalleryComponent", () => {
  let component: DetailHeaderGalleryComponent;
  let fixture: ComponentFixture<DetailHeaderGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHeaderGalleryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHeaderGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
