import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    LanguageSwitcher,
    TranslatePipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
