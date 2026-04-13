import { Component, OnInit, OnDestroy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isDarkTheme = signal(true);

  navItems = [
    { label: 'Home', path: '/' },
    { label: 'Deal Insights', path: '/category/Deal Insights' },
    { label: 'DStreet Dissekt', path: '/category/DStreet Dissekt' },
    { label: 'Regulatory Updates', path: '/category/Regulatory Updates' },
    { label: 'Tax Dissekt', path: '/category/Tax Dissekt' },
    { label: 'Startup Insights', path: '/category/Startup Insights' },
    { label: 'About Me', path: '/about' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  ngOnInit(): void {
    this.onScroll();
    // Initialize theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.setLightTheme();
    }
  }

  ngOnDestroy(): void {}

  toggleTheme(): void {
    if (this.isDarkTheme()) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  private setLightTheme(): void {
    document.body.classList.add('light-theme');
    this.isDarkTheme.set(false);
    localStorage.setItem('theme', 'light');
  }

  private setDarkTheme(): void {
    document.body.classList.remove('light-theme');
    this.isDarkTheme.set(true);
    localStorage.setItem('theme', 'dark');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
