import { Component, ViewChild } from "@angular/core";
import { NgSelectComponent } from "@ng-select/ng-select";
import { Subject } from "rxjs";

@Component({
  template: ``
})
export class NgSelectTestCmp {
  @ViewChild(NgSelectComponent) select: NgSelectComponent;
  multiple = false;
  clearOnBackspace = false;
  disabled = false;
  dropdownPosition = "bottom";
  visible = true;
  filter = new Subject<string>();
  searchFn: (term: string, item: any) => boolean = null;
  selectOnTab = true;
  hideSelected = false;

  citiesLoading = false;
  selectedCityId: number;
  selectedCityIds: number[];
  selectedCity: { id: number; name: string };
  selectedCities: { id: number; name: string }[];
  cities: any[] = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pabrade" }
  ];
  citiesNames = this.cities.map(x => x.name);

  selectedCountry: any;
  countries = [
    { id: 1, description: { name: "Lithuania", id: "a" } },
    { id: 2, description: { name: "USA", id: "b" } },
    { id: 3, description: { name: "Australia", id: "c" } }
  ];

  tagFunc(term: string) {
    return { id: term, name: term, custom: true };
  }

  tagFuncPromise(term: string) {
    return Promise.resolve({
      id: 5,
      name: term,
      valid: true
    });
  }

  compareWith(a, b) {
    return a.name === b.name && a.district === b.district;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

  onChange(_: Event) {}

  onFocus(_: Event) {}

  onBlur(_: Event) {}

  onOpen() {}

  onClose() {}

  onAdd() {}

  onRemove() {}

  onClear() {}

  onSearch() {}

  onScroll() {}

  onScrollToEnd() {}
}
