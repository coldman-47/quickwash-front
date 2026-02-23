import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Wash } from '../../models/wash/wash';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WashService {
  url = environment.apiUrl + '/wash';
  details = new BehaviorSubject<Wash | null>(null);
  newWash: Subject<Wash> = new Subject<Wash>();

  constructor(private http: HttpClient) {}

  add(wash: Wash) {
    return this.http.post<Wash>(this.url, wash);
  }

  getAll() {
    return this.http.get<any>(this.url);
  }

}
