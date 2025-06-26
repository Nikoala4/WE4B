import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBuyDecorationResponse } from '../../../nooble/api-comm/BuyDecorationResponse';
import { ApiCreateDecorationResponse } from '../../../nooble/api-comm/CreateDecorationResponse';
import { ApiGetDecorationInformationResponse } from '../../../nooble/api-comm/GetDecorationInfoResponse';
import { Decoration } from '../../../nooble/api-objs/Decoration';

export class ApiDecorationsService {

  constructor(private endpointUrl: string, private http: HttpClient) {}

  buy(decorationId: string): Observable<ApiBuyDecorationResponse>
  {
    return this.http.post<ApiBuyDecorationResponse>(this.endpointUrl + "/decorations/buy", {
      decoration: decorationId
    }, {withCredentials: true});
  }

  create(name: string, price: number, imageId: string): Observable<ApiCreateDecorationResponse>
  {
    return this.http.post<ApiCreateDecorationResponse>(this.endpointUrl + "/decorations/create", {
      name,
      price,
      image_id: imageId
    }, {withCredentials: true});
  }

  delete(decorationId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/decorations/delete", {
      decoration_id: decorationId
    }, {withCredentials: true});
  }

  getInformation(decorationId: string): Observable<ApiGetDecorationInformationResponse>
  {
    let url = new URL(this.endpointUrl + "/decorations/get-info");
    url.searchParams.set("decoration", decorationId);

    return this.http.get<ApiGetDecorationInformationResponse>(url.toString(), {withCredentials: true});
  }

  listDecorations(): Observable<Decoration[]>
  {
    return this.http.get<Decoration[]>(this.endpointUrl + "/decorations/list", {withCredentials: true});
  }

  modify(decorationId: string, name: string, price: number, imageId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/decorations/modify", {
      decoration_id: decorationId,
      name,
      price,
      image: imageId
    }, {withCredentials: true});
  }
  
}
