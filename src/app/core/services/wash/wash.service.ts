import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wash } from '../../models/wash/wash';

@Injectable({
  providedIn: 'root',
})
export class WashService {
  details = new BehaviorSubject<Wash | null>(null);
}
