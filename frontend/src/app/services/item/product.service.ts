import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpService: HttpService) {}

  getProductDetails(id: number) {}

  getProducts() {
    console.log(this.httpService.getPosts());
  }

  updateProductDetails(object: any) {}

  addProduct(object: any) {}

  removeProduct(id: number) {}
}
