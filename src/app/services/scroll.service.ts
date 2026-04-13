import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  initScrollAnimations(): void {
    if (!this.isBrowser()) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, this.observerOptions);

    document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach(el => {
      observer.observe(el);
    });
  }

  scrollToElement(elementId: string, offset: number = 80): void {
    if (!this.isBrowser()) return;
    
    const element = document.getElementById(elementId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  onScroll(callback: (scrollY: number) => void): () => void {
    if (!this.isBrowser()) return () => {};

    const handler = () => callback(window.scrollY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }
}
