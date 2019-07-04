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
});
