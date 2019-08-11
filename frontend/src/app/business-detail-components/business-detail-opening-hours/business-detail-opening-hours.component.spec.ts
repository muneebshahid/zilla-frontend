import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessDetailOpeningHoursComponent } from "./business-detail-opening-hours.component";
import { opening_timingsDummy } from "src/app/testing/models";
import { By } from "@angular/platform-browser";

describe("BusinessDetailOpeningHoursComponent", () => {
  let component: BusinessDetailOpeningHoursComponent;
  let fixture: ComponentFixture<BusinessDetailOpeningHoursComponent>;
  let opening_timings;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDetailOpeningHoursComponent]
    }).compileComponents();

    opening_timings = opening_timingsDummy;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailOpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set date time variables properly and html should show values", () => {
    component.opening_timings = opening_timings;
    component.ngOnChanges({});
    fixture.detectChanges();
    const dayBlock: HTMLElement = fixture.debugElement.queryAll(By.css(".day"))[0].nativeElement;
    const startBlock: HTMLElement = fixture.debugElement.queryAll(By.css(".start"))[0]
      .nativeElement;
    const endBlock: HTMLElement = fixture.debugElement.queryAll(By.css(".end"))[0].nativeElement;

    expect(component.open_time.length).toBeGreaterThan(0);
    expect(component.close_time.length).toBeGreaterThan(0);
    expect(component.open_time[0]).toBe(opening_timings[0].open);
    expect(component.close_time[0]).toBe(opening_timings[0].close);
    expect(dayBlock.innerHTML.trim()).toBe(component.days[0]);
    expect(startBlock.innerHTML.trim()).toBe(opening_timings[0].open);
    expect(endBlock.innerHTML.trim()).toBe(opening_timings[0].close);
  });
});
