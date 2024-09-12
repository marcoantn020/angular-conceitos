import { Injectable } from '@angular/core';
import {AnimalInterface} from "../components/list-render/AnimalInterface";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = "http://localhost:3000/animals"
  constructor(private http: HttpClient) { }

  remove(id: number) {
    return this.http.delete<AnimalInterface>(`${this.apiUrl}/${id}`)
  }

  getAll(): Observable<AnimalInterface[]> {
    return this.http.get<AnimalInterface[]>(this.apiUrl)
  }

  getItem(id: number): Observable<AnimalInterface> {
    return this.http.get<AnimalInterface>(`${this.apiUrl}/${id}`)
  }
}
