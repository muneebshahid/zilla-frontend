import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgSelectModule } from "@ng-select/ng-select";
import { GeneralInfoComponent } from "./general-info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { tickAndDetectChanges } from "src/app/testing/general-helpers";

describe("GeneralInfoComponent", () => {
  let component: GeneralInfoComponent;
  let fixture: ComponentFixture<GeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInfoComponent],
      imports: [NgSelectModule, FormsModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load ng-select successfully", () => {
    const nativeElement: HTMLElement = fixture.debugElement.query(By.css(".dropdowner"))
      .nativeElement;
    tickAndDetectChanges(fixture);
    const itemsList = fixture.componentInstance.select.itemsList;
    expect(itemsList.items.length).toBe(7);
    expect(itemsList.items[0]).toEqual(
      jasmine.objectContaining({
        label: "0",
        value: 0
      })
    );
  });
});
