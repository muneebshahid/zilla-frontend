import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgSelectModule } from "@ng-select/ng-select";
import { GeneralInfoComponent } from "./general-info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
});
