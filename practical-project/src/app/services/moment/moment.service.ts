import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MomentsInterface} from "../../MomentsInterface";
import {ResponseInterface} from "../../ResponseInterface";

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl: string = environment.baseApiUrl
  private apiUrl: string = `${this.baseApiUrl}/api/moments`

  constructor(private http: HttpClient) {
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  getMoments(): Observable<ResponseInterface<MomentsInterface[]>> {
    return this.http.get<ResponseInterface<MomentsInterface[]>>(this.apiUrl)
  }

  getMomentById(id: number) {``
    return this.http.get<ResponseInterface<MomentsInterface>>(`${this.apiUrl}/${id}`)
  }

  removeMoment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData)
  }
}
