import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpParamsOptions } from "@angular/common/http/src/params";
@Injectable({
  providedIn: "root"
})
export class HttpService {
  // private readonly baseUrl = "https://jsonplaceholder.typicode.com";
  public readonly baseUrl = environment.apiEndpoint;

  constructor(private httpclient: HttpClient) {}

  post(url: string, params: HttpParamsOptions): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/${url}`, params);
  }

  get(url: string, params: any): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/${url}`, { params: params });
  }
}
