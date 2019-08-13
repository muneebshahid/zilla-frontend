import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailHeaderComponent } from "./detail-header.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

describe("DetailHeaderComponent", () => {
  let component: DetailHeaderComponent;
  let fixture: ComponentFixture<DetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHeaderComponent],
      imports: [FontAwesomeModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set all values properly", () => {
    component.address = "dummy_address";
    component.description = "dummy_description";
    component.is_open_or_available = false;
    component.open_or_available = "Open";
    component.phone = "dummy_phone";
    component.title = "dummy_title";
    component.type = {
      icon: "dummy_icon",
      tag: "dummy_tag"
    };

    fixture.detectChanges();

    let addressElement: HTMLElement = fixture.debugElement.query(By.css(".google_map_link"))
      .nativeElement;
    let descriptionElement: HTMLElement = fixture.debugElement.query(By.css(".listing-tagline"))
      .nativeElement;
    let open_or_availableElement: HTMLElement = fixture.debugElement.query(By.css(".listing-time"))
      .nativeElement;
    let phoneElement: HTMLElement = fixture.debugElement.query(By.css(".listing-phone"))
      .nativeElement;
    let titleElement: HTMLElement = fixture.debugElement.query(By.css(".entry-title"))
      .nativeElement;
    let typeElement: HTMLElement = fixture.debugElement.query(By.css(".listing-category"))
      .nativeElement;

    expect(addressElement.innerHTML).toContain(component.address);
    expect(descriptionElement.innerHTML).toContain(component.description);
    expect(open_or_availableElement.innerHTML).toContain(component.open_or_available);
    expect(phoneElement.innerHTML).toContain(component.phone);
    expect(titleElement.innerHTML).toContain(component.title);
    expect(typeElement.innerHTML).toContain(component.type.tag);
  });
});
