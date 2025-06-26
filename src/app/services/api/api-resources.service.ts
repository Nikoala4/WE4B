import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { File as FileObject } from '../../../nooble/api-objs/File';
import { FileType } from '../../../nooble/api-objs/FileType';
import { FileRawResponse } from '../../../nooble/api-comm/FileRawResponse';
import { ApiUploadFileResponse } from '../../../nooble/api-comm/UploadFileResponse';
import { ApiUploadFileRawResponse } from '../../../nooble/api-comm/UploadFileRawResponse';

export class ApiResourcesService {

  constructor(private endpointUrl: string, private http: HttpClient) {}

  delete(resourceId: string): Observable<null> {
    return this.http.post<null>(this.endpointUrl + "/resources/delete", {
      id: resourceId
    }, {withCredentials: true});
  }

  getSelfFiles(type?: FileType): Observable<FileObject[]> {
    let url = new URL(this.endpointUrl + "/resources/get-self-files");

    if (type) {
      url.searchParams.set("type", type);
    }

    return this.http.get<FileRawResponse[]>(url.toString(), {withCredentials: true}).pipe(
      map(
        (files: FileRawResponse[]) => files.map(
          file => ({
            ...file,
            sent_date: new Date(file.sent_date * 1000)
          })
        )
      )
    );
  }

  upload(name: string, type: FileType, file: Blob): Observable<ApiUploadFileResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('file', file as any); // Cast to any to avoid type issues

    return this.http.post<ApiUploadFileRawResponse>(this.endpointUrl + "/resources/upload", formData, {withCredentials: true}).pipe(
      map((response: ApiUploadFileRawResponse) => ({
        ...response,
        date: new Date(response.date * 1000)
      }))
    );
  }

}
