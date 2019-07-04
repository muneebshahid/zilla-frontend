import { DebugElement } from "@angular/core";
import { TestBed, ComponentFixture, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Injectable, ErrorHandler, NgZone, Type } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ConsoleService } from "@ng-select/ng-select/ng-select/console.service";
import { KeyCode } from "@ng-select/ng-select/ng-select/ng-select.types";

export function tickAndDetectChanges(fixture: ComponentFixture<any>) {
  fixture.detectChanges();
  tick();
}

export function selectOption(fixture, key: KeyCode, index: number) {
  triggerKeyDownEvent(getNgSelectElement(fixture), KeyCode.Space); // open
  tickAndDetectChanges(fixture); // need to tick and detect changes, since dropdown fully inits after promise is resolved
  for (let i = 0; i < index; i++) {
    triggerKeyDownEvent(getNgSelectElement(fixture), key);
  }
  triggerKeyDownEvent(getNgSelectElement(fixture), KeyCode.Enter); // select
}

export function getNgSelectElement(fixture: ComponentFixture<any>): DebugElement {
  return fixture.debugElement.query(By.css("ng-select"));
}

export function triggerKeyDownEvent(element: DebugElement, which: number, key = ""): void {
  element.triggerEventHandler("keydown", {
    which: which,
    key: key,
    preventDefault: () => {}
  });
}
export class TestsErrorHandler {}

export function createNgTestingModule<T>(cmp: Type<T>, template: string): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [FormsModule, NgSelectModule],
    declarations: [cmp],
    providers: [
      { provide: ErrorHandler, useClass: TestsErrorHandler },
      { provide: NgZone, useFactory: () => new MockNgZone() },
      { provide: ConsoleService, useFactory: () => new MockConsole() }
    ]
  })
    .overrideComponent(cmp, {
      set: {
        template: template
      }
    })
    .compileComponents();

  const fixture = TestBed.createComponent(cmp);
  fixture.detectChanges();
  return fixture;
}

@Injectable()
export class MockNgZone extends NgZone {
  constructor() {
    super({ enableLongStackTrace: true });
  }

  run(fn: Function): any {
    return fn();
  }

  runOutsideAngular(fn: Function): any {
    return fn();
  }
}

@Injectable()
export class MockConsole {
  warn() {}
}
