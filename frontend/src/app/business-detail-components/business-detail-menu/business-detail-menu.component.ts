import { IProduct } from "src/app/models/product";
import { Component, OnInit, Input, AfterViewInit, SimpleChanges, OnChanges } from "@angular/core";
import { environment } from "src/environments/environment";
import { IBusinessMenu, MenuItem } from "src/app/models/business_menu";

declare var jQuery: any;

@Component({
  selector: "app-business-detail-menu",
  templateUrl: "./business-detail-menu.component.html",
  styleUrls: ["./business-detail-menu.component.css"]
})
export class BusinessDetailMenuComponent implements OnInit, OnChanges {
  @Input() products: IProduct[];
  public endpoint: string = environment.apiEndpoint;
  public businessMenus: IBusinessMenu[] = [];

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (this.products !== null) {
      this.businessMenus = [];
      for (let i = 0; i < this.products.length; i++) {
        let menuItem: MenuItem = {
          description: this.products[i].description,
          title: this.products[i].title,
          image: this.products[i].images[0].file,
          price: this.products[i].price
        };

        const categoryIndex = this.getBusinessMenuIndex(this.products[i].product_type.tag);
        if (categoryIndex !== -1) {
          /* we've already added this category. Add the product to the items of this category */
          this.businessMenus[categoryIndex].menuItem.push(menuItem);
        } else {
          /* create a new category */
          let businessM = {} as IBusinessMenu;

          businessM.menuCategory = this.products[i].product_type.tag;
          businessM.menuItem = [];
          businessM.collapsed = true;

          /* This gives us the opportunity to toggle the accordion by name */
          businessM.name = this.products[i].product_type.tag.replace(/\s/g, "") + i;

          businessM.menuItem.push(menuItem);
          this.businessMenus.push(businessM);
        }
      }
    }
  }

  /* if a menu category is already in the BusinessMenu array this function will return that index otherwise -1 */
  getBusinessMenuIndex(category: string) {
    for (let i = 0; i < this.businessMenus.length; i++) {
      if (this.businessMenus[i].menuCategory === category) {
        return i;
      }
    }

    return -1;
  }

  toggleCollapseIcon(index) {
    /* close all other business menus */
    for (let i = 0; i < this.businessMenus.length; i++) {
      if (index !== i) {
        jQuery("." + this.businessMenus[i].name).collapse("hide");
      }
    }

    jQuery("." + this.businessMenus[index].name).collapse("toggle");

    this.businessMenus[index].collapsed = !this.businessMenus[index].collapsed;
  }
}
