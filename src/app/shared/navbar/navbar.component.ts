import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../enums/theme';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private readonly renderer = inject(Renderer2)

  public iconUrl: string = 'assets/navbar/icons/moon.svg'
  public currentTheme !: Theme

  ngOnInit(): void {
    this.getUserTheme();
  }


  private setIconAndTheme(theme: Theme) {
    this.iconUrl =
      theme === Theme.DARK
        ? 'assets/navbar/icons/sun.svg'
        : 'assets/navbar/icons/moon.svg';
    this.currentTheme = theme;
  }

  private getDefaultTheme(): Theme {
    return (localStorage.getItem('theme') as Theme || Theme.LIGHT);
  }

  public getUserTheme() {
    const currentTheme = this.getDefaultTheme();

    if (!currentTheme) localStorage.setItem('theme', Theme.LIGHT);

    switch (currentTheme) {
      case Theme.DARK:
        this.setIconAndTheme(Theme.DARK);
        break;
      case Theme.LIGHT:
        this.setIconAndTheme(Theme.LIGHT);
        break;
      default:
        localStorage.setItem('theme', Theme.LIGHT);
        return;
    }

    this.setTheme();
  }

  public toggleTheme() {
    this.currentTheme =
      this.currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    localStorage.setItem('theme', this.currentTheme);

    this.getUserTheme();
    this.setTheme();
  }

  public setTheme() {
    if (this.currentTheme === Theme.DARK) {
      this.renderer.addClass(document.body, Theme.DARK);
    } else {
      this.renderer.removeClass(document.body, Theme.DARK);
    }
  }
}
