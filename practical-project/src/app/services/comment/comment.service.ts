import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {ResponseInterface} from "../../ResponseInterface";
import {CommentsInterface} from "../../CommentsInterface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseApiUrl: string = environment.baseApiUrl

  constructor(private http: HttpClient) {
  }

  createComment(data: CommentsInterface): Observable<ResponseInterface<CommentsInterface>> {
    const apiUrl: string = `${this.baseApiUrl}/api/moments/${data.momentId}/comments`
    return this.http.post<ResponseInterface<CommentsInterface>>(apiUrl, data);
  }

}
