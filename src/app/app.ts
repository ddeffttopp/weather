import { Component, inject, OnInit } from '@angular/core';
import { Weather } from './features/weather/weather';
import { Header } from './layout/header/header';
import { Languages } from './core/entities/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [Weather, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    this.setDefaultLanguage();
  }

  private setDefaultLanguage(): void {
    const savedLang = localStorage.getItem('selectedLanguage');

    if (savedLang && Languages.includes(savedLang)) {
      this.translateService.use(savedLang);
    } else {
      this.translateService.use(Languages[0]);
    }
  }
}
