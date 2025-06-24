import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './api-endpoint-config';
import { ApiBuyDecorationResponse } from '../../nooble/api-comm/BuyDecorationResponse';
import { ApiCreateDecorationResponse } from '../../nooble/api-comm/CreateDecorationResponse';
import { ApiGetDecorationInformationResponse } from '../../nooble/api-comm/GetDecorationInfoResponse';
import { Decoration } from '../../nooble/api-objs/Decoration';

@Injectable({
  providedIn: 'root'
})
export class ApiDecorationsService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string, private http: HttpClient) {}

  buy(decorationId: string): Observable<ApiBuyDecorationResponse>
  {
    return this.http.post<ApiBuyDecorationResponse>(this.endpointUrl + "/decorations/buy", {
      decoration: decorationId
    });
  }

  create(name: string, price: number, imageId: string): Observable<ApiCreateDecorationResponse>
  {
    return this.http.post<ApiCreateDecorationResponse>(this.endpointUrl + "/decorations/create", {
      name,
      price,
      image_id: imageId
    });
  }

  delete(decorationId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/decorations/delete", {
      decoration_id: decorationId
    });
  }

  getInfo(decorationId: string): Observable<ApiGetDecorationInformationResponse>
  {
    let url = new URL(this.endpointUrl = "/decorations/get-info");
    url.searchParams.set("decoration", decorationId);

    return this.http.get<ApiGetDecorationInformationResponse>(url.toString());
  }

  listDecorations(): Observable<Decoration[]>
  {
    return this.http.get<Decoration[]>(this.endpointUrl + "/decorations/list");
  }

  modify(decorationId: string, name: string, price: number, imageId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/decorations/modify", {
      decoration_id: decorationId,
      name,
      price,
      image: imageId
    });
  }
  
}
