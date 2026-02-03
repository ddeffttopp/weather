import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './location.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private geocoding = inject(LocationService);

  async getWeatherByCity(city: string) {
    const { lat, lon } = await this.geocoding.getCoordinates(city);

    const response: OpenMeteoResponse = await firstValueFrom(
      this.http.get<OpenMeteoResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      )
    );

    return {
      temperature: response.current.temperature_2m,
      humidity: response.current.relative_humidity_2m,
      windSpeed: response.current.wind_speed_10m,
      weatherCode: response.current.weather_code
    };
  }
}
