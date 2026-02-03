import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesType } from '../entities/types';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  currentLang = signal<LanguagesType>('ua');

  constructor() {
    this.currentLang.set(this.translateService.getCurrentLang() as LanguagesType);
    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => this.currentLang.set(e.lang as LanguagesType));
  }

  weatherCodeKey(code: number) {
    return `weather.codes.${code}`;
  }
}
