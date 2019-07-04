import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OpeningClosingHoursComponent } from "./opening-closing-hours.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("OpeningClosingHoursComponent", () => {
  let component: OpeningClosingHoursComponent;
  let fixture: ComponentFixture<OpeningClosingHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningClosingHoursComponent],
      imports: [NgSelectModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningClosingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ensure the labels are named correctly", () => {
    const listingElementDe: DebugElement = fixture.debugElement;

    const sectionTitle = listingElementDe.query(By.css(".section-title"));
    const jobHoursDe = listingElementDe.query(By.css(".job-hours"));
    const dayTableHeaderDe = listingElementDe.query(By.css(".day-th"));
    const openTableHeaderDe = listingElementDe.query(By.css(".day-open"));
    const closeTableHeaderDe = listingElementDe.query(By.css(".day-close"));
    const mondayDe = listingElementDe.query(By.css(".monday"));
    const tuesdayDe = listingElementDe.query(By.css(".tuesday"));
    const wednesdayDe = listingElementDe.query(By.css(".wednesday"));
    const thursdayDe = listingElementDe.query(By.css(".thursday"));
    const fridayDe = listingElementDe.query(By.css(".friday"));
    const saturdayDe = listingElementDe.query(By.css(".saturday"));
    const sundayDe = listingElementDe.query(By.css(".sunday"));

    expect(sectionTitle.nativeElement.textContent).toEqual("Hours");
    expect(jobHoursDe.nativeElement.textContent).toEqual("Hours of Operation");
    expect(dayTableHeaderDe.nativeElement.textContent).toEqual("Day");
    expect(openTableHeaderDe.nativeElement.textContent).toEqual("Open");
    expect(closeTableHeaderDe.nativeElement.textContent).toEqual("Close");
    expect(mondayDe.nativeElement.textContent).toEqual("Monday");
    expect(tuesdayDe.nativeElement.textContent).toEqual("Tuesday");
    expect(wednesdayDe.nativeElement.textContent).toEqual("Wednesday");
    expect(thursdayDe.nativeElement.textContent).toEqual("Thursday");
    expect(fridayDe.nativeElement.textContent).toEqual("Friday");
    expect(saturdayDe.nativeElement.textContent).toEqual("Saturday");
    expect(sundayDe.nativeElement.textContent).toEqual("Sunday");
  });
});
