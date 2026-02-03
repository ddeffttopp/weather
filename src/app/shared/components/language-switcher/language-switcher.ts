import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { Languages } from '../../../core/entities/constants';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher implements OnInit {
  private translateService = inject(TranslateService);

  currentLang = signal<string>('');

  ngOnInit(): void {
    this.currentLang.set(this.translateService.getCurrentLang());
  }

  toggleLanguage(): void {
    const currentLang = this.currentLang();
    const langIndex = Languages.indexOf(currentLang);

    (langIndex + 1 >= Languages.length
        ? this.translateService.use(Languages[0])
        : this.translateService.use(Languages[langIndex + 1])
    )
      .pipe(take(1))
      .subscribe(() => {
        const currentLang = this.translateService.getCurrentLang();
        this.currentLang.set(currentLang);
        localStorage.setItem('selectedLanguage', currentLang);
      });
  }
}
