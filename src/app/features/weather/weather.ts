import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';
import { WeatherInterface } from '../../core/entities/interface/weather.interface';
import { WeatherCacheService } from '../../core/services/weather-cache.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguagesService } from '../../core/services/languages.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [TranslatePipe, NgClass],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Weather {
  private weatherService = inject(WeatherService);
  private cacheService = inject(WeatherCacheService);
  private languagesService = inject(LanguagesService);
  private translate = inject(TranslateService);

  city = signal('');
  loading = signal(false);
  errorKey = signal<string | null>(null);
  weather = signal<WeatherInterface | null>(null);

  language = computed(() => this.languagesService.currentLang());

  viewModel = computed(() => {
    const w = this.weather();
    if (!w) return null;

    const lang = this.language();

    return {
      ...w,
      conditionText: this.translate.instant(this.languagesService.weatherCodeKey(w.weatherCode)),
    };
  });

  reactiveError = computed(() => {
    const key = this.errorKey();
    if (!key) return null;
    const lang = this.language();
    return this.translate.instant(key);
  });

  async submit() {
    const city = this.city().trim();
    if (!city) return;

    this.weather.set(null);
    this.loading.set(true);
    this.errorKey.set(null);

    const cached = this.cacheService.get(city);
    if (cached) {
      this.weather.set(cached);
      this.loading.set(false);
      return;
    }

    try {
      const data = await this.weatherService.getWeatherByCity(city);
      this.cacheService.set(city, data);
      this.weather.set(data);
    } catch (e) {
      this.errorKey.set('errors.cityNotFound');
    } finally {
      this.loading.set(false);
    }
  }
}
