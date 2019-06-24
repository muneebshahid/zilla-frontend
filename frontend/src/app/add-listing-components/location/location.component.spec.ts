import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LocationComponent } from "./location.component";

@Component({ selector: "app-map", template: "" })
class MapComponent {
  @Input() mapClass = "";
}

export class MockMapsAPILoader {
  public load(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}

describe("LocationComponent", () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent, MapComponent],
      providers: [MockMapsAPILoader]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
