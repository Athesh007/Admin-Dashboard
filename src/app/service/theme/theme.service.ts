import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  switchTheme(light: boolean) {
    let element = this.document.getElementById('theme') as HTMLLinkElement;
    element.href = light ? 'light-theme.css' : 'dark-theme.css';
  }
}
