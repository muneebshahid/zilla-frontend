import { asyncData } from "./async-observable-helpers";

export class LocationServiceSpy {
  /* emit cloned test hero */
  setDetailLocation = jasmine
    .createSpy("setDetailLocation")
    .and.callFake(() => asyncData(Object.assign({})));
}
