// src/app/services/osm.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  class: string;
  address?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class OsmService {
  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  search(q: string, opts?: { limit?: number; countrycodes?: string; }) : Observable<NominatimResult[]> {
    if (!q?.trim()) return new Observable<NominatimResult[]>((sub) => { sub.next([]); sub.complete(); });

    const params = new HttpParams()
      .set('q', q)
      .set('format', 'jsonv2')
      .set('addressdetails', '1')
      .set('limit', String(opts?.limit ?? 5))
      .set('accept-language', 'fr')
      .set('countrycodes', opts?.countrycodes ?? 'fr'); // optionnel : restreindre à FR

    const headers = new HttpHeaders({
      // Renseigne ton email/domaine pour respecter la politique d’OSM/Nominatim
      'Accept': 'application/json',
      'User-Agent': 'LaundryApp/1.0 (contact: ton-email@domaine.tld)'
    });

    return this.http.get<NominatimResult[]>(this.baseUrl, { params, headers }).pipe(
      map(results => results ?? [])
    );
  }
}