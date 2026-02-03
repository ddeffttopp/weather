import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http = inject(HttpClient);

  async getCoordinates(city: string): Promise<{ lat: number; lon: number }> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&accept-language=uk`;

    const response: any = await firstValueFrom(this.http.get(url));

    if (!response || response.length === 0) {
      throw new Error('City not found');
    }

    return {
      lat: parseFloat(response[0].lat),
      lon: parseFloat(response[0].lon),
    };
  }
}
