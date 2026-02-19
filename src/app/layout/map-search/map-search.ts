// src/app/components/map-search/map-search.component.ts
import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import * as L from 'leaflet';
import { Subscription, fromEvent, debounceTime, filter, switchMap, map as rxMap } from 'rxjs';
import { OsmService } from '../../core/services/osm/osm.service';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.html',
  styleUrls: ['./map-search.scss'],
  standalone: false
})
export class MapSearch implements AfterViewInit, OnDestroy {
  @Output() pick = new EventEmitter<{ lat: number; lon: number; address?: string }>();

  private map!: L.Map;
  private marker?: L.Marker;
  private searchInput?: HTMLInputElement;
  private sub?: Subscription;

  constructor(private osm: OsmService) {}

  ngAfterViewInit(): void {
    this.map = L.map('map', { zoomControl: true }).setView([48.8566, 2.3522], 12); // Paris par défaut

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(this.map);

    // Création d’un champ de recherche HTML simple
    this.searchInput = document.getElementById('map-search-input') as HTMLInputElement;

    if (this.searchInput) {
      this.sub = fromEvent(this.searchInput, 'input')
        .pipe(
          rxMap(() => this.searchInput!.value.trim()),
          debounceTime(300),
          filter((v) => v.length >= 3),
          switchMap((v) => this.osm.search(v, { limit: 8 })),
        )
        .subscribe((results) => {
          // ici tu peux afficher une liste, ou choisir le premier résultat
          const first = results[0];
          if (first) {
            const lat = +first.lat,
              lon = +first.lon;
            this.setMarker(lat, lon, first.display_name);
            this.pick.emit({ lat, lon, address: first.display_name });
          }
        });
    }

    // Click sur la carte → géocodage inverse (optionnel)
    this.map.on('click', async (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
      const address = await this.reverseGeocode(lat, lon);
      this.setMarker(lat, lon, address ?? `lat ${lat.toFixed(5)}, lon ${lon.toFixed(5)}`);
      this.pick.emit({ lat, lon, address: address ?? undefined });
    });
  }

  private setMarker(lat: number, lon: number, popup?: string) {
    if (!this.marker) {
      this.marker = L.marker([lat, lon], {
        icon: L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconAnchor: [12, 41],
        }),
      }).addTo(this.map);
    } else {
      this.marker.setLatLng([lat, lon]);
    }
    if (popup) {
      this.marker.bindPopup(popup).openPopup();
    }
    this.map.setView([lat, lon], 16);
  }

  private async reverseGeocode(lat: number, lon: number): Promise<string | null> {
    const url = new URL('https://nominatim.openstreetmap.org/reverse');
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('lat', String(lat));
    url.searchParams.set('lon', String(lon));
    url.searchParams.set('accept-language', 'fr');

    const resp = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'LaundryApp/1.0 (contact: ton-email@domaine.tld)',
      },
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data?.display_name ?? null;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.map?.remove();
  }
}
