import { ComponentFixture, tick } from "@angular/core/testing";
import { DebugElement } from "@angular/core";

export function tickAndDetectChanges(fixture: ComponentFixture<any>) {
  fixture.detectChanges();
  tick();
}
