import { Injectable } from '@angular/core';
import { WeatherInterface } from '../entities/interface/weather.interface';

const CACHE_TTL = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class WeatherCacheService {
  private cache = new Map<string, { data: WeatherInterface; timestamp: number }>();

  get(city: string): WeatherInterface | null {
    const key = city.toLowerCase();
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() - entry.timestamp > CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set(city: string, data: WeatherInterface): void {
    const key = city.toLowerCase();
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
