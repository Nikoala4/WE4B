import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_ENDPOINT } from './api-endpoint-config';
import { ApiCreateNewClassResponse } from '../../nooble/api-comm/CreateNewClassResponse';
import { ApiGetClassDataResponse } from '../../nooble/api-comm/GetClassDataResponse';
import { ApiGetClassDataRawResponse } from '../../nooble/api-comm/GetClassDataRawResponse';
import { ContainerSectionData } from '../../nooble/api-objs/Section';
import { ApiGetClassContentResponse } from '../../nooble/api-comm/GetClassContentResponse';
import { Class } from '../../nooble/api-objs/Class';
import { ApiSearchClassRawResponse } from '../../nooble/api-comm/SearchClassRawResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiClassesService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string, private http: HttpClient) {}

  addAccountToClass(userId: string, classId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/classes/add-account", {
      user_id: userId,
      class_id: classId
    }, {withCredentials: true});
  }

  createNew(name: string, description: string): Observable<ApiCreateNewClassResponse>
  {
    return this.http.post<ApiCreateNewClassResponse>(this.endpointUrl + "/classes/create", {
      name, description
    }, {withCredentials: true})
  }

  getData(classId: string): Observable<ApiGetClassDataResponse>
  {
    let url = new URL(this.endpointUrl + "/classes/data");
    url.searchParams.set("class_id", classId);

    return this.http.get<ApiGetClassDataRawResponse>(url.toString(), {withCredentials: true}).pipe(
      map(
        (data: ApiGetClassDataRawResponse) => ({
          ...data,
          last_modification: new Date(data.last_modification * 1000),
        })
      )
    );
  }

  delete(classId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/classes/delete", {
      class_id: classId
    }, {withCredentials: true});
  }

  edit(classId: string, title: string, description: string, content: ContainerSectionData): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/classes/edit", {
      id: classId,
      title,
      description, 
      content
    }, {withCredentials: true});
  }

  getAccounts(classId: string): Observable<string[]>
  {
    let url = new URL(this.endpointUrl + "/classes/get-accounts");
    url.searchParams.set("class_id", classId);

    return this.http.get<string[]>(url.toString(), {withCredentials: true});
  }

  getContent(classId: string): Observable<ApiGetClassContentResponse>
  {
    let url = new URL(this.endpointUrl + "/classes/get-content");
    url.searchParams.set("class_id", classId);

    return this.http.get<ApiGetClassContentResponse>(url.toString(), {withCredentials: true});
  }

  removeAccount(classId: string, userId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/classes/remove-account", {
      class_id: classId,
      user_id: userId
    }, {withCredentials: true});
  }

  searchClass(pattern: string, count: number, offset: number): Observable<Class[]>
  {
    let url = new URL(this.endpointUrl + "/classes/search");
    url.searchParams.set("pattern", pattern);
    url.searchParams.set("count", count.toString());
    url.searchParams.set("offset", offset.toString());

    return this.http.get<ApiSearchClassRawResponse[]>(url.toString(), {withCredentials: true}).pipe(
      map(
        (classesData: ApiSearchClassRawResponse[]) => {
          return classesData.map(
            (classData) => ({
              ...classData,
              last_modification: new Date(classData.last_modification * 1000)
            })
          )
        }
      )
    )
  }
  
}
