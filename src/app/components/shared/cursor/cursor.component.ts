import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #cursorEl class="custom-cursor" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none">
        <defs>
          <!-- Branded hover gradient: Gold to Red -->
          <linearGradient id="hover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#C8A96E; stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D94F3B; stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Paper Plane / Concave Triangle shape -->
        <path
          class="cursor-body"
          d="M3.5 3.5L21.5 11.5L12.5 13.5L14.5 22.5L3.5 3.5Z"
        />
      </svg>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999999;
      will-change: transform;
      opacity: 0;
      filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35));
    }

    .cursor-body {
      fill: var(--cursor-fill);
      stroke: var(--cursor-stroke);
      stroke-width: 1.8;
      stroke-linejoin: round;
      transition: fill 0.3s ease, stroke 0.3s ease;
    }

    /* Interactive state - Use the SVG gradient id */
    :host-context(.cursor-hovering) .cursor-body {
      fill: url(#hover-gradient) !important;
      stroke: #FFFFFF; /* High contrast stroke for the gradient state */
    }
  `],
})
export class CursorComponent implements OnInit {
  @ViewChild('cursorEl', { static: true }) cursorEl!: ElementRef<HTMLDivElement>;

  private xTo!: any;
  private yTo!: any;
  private isBrowser: boolean;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const el = this.cursorEl.nativeElement;

    // Set up GSAP QuickSetters for maximum performance (60fps+)
    this.ngZone.runOutsideAngular(() => {
      this.xTo = gsap.quickTo(el, "x", { duration: 0.25, ease: "power3" });
      this.yTo = gsap.quickTo(el, "y", { duration: 0.25, ease: "power3" });

      // Gentle fade in
      gsap.to(el, { opacity: 1, duration: 0.4 });
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(e: MouseEvent) {
    if (!this.xTo || !this.yTo) return;
    
    // Position the tip (not the center) of the triangle
    this.xTo(e.clientX - 4);
    this.yTo(e.clientY - 2);

    // Dynamic hover check
    const target = e.target as HTMLElement;
    const isInteractive = target?.closest('a, button, [role="button"], input, select, textarea');
    
    if (isInteractive) {
      document.body.classList.add('cursor-hovering');
      gsap.to(this.cursorEl.nativeElement, { scale: 1.2, duration: 0.3, ease: 'back.out(1.7)' });
    } else {
      document.body.classList.remove('cursor-hovering');
      gsap.to(this.cursorEl.nativeElement, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  }

  @HostListener('window:mousedown')
  onDown() {
    gsap.to(this.cursorEl.nativeElement, { scale: 0.85, duration: 0.2 });
  }

  @HostListener('window:mouseup')
  onUp() {
    gsap.to(this.cursorEl.nativeElement, { scale: 1, duration: 0.2 });
  }

  @HostListener('window:mouseleave')
  onLeave() {
    gsap.to(this.cursorEl.nativeElement, { opacity: 0, duration: 0.3 });
  }

  @HostListener('window:mouseenter')
  onEnter() {
    gsap.to(this.cursorEl.nativeElement, { opacity: 1, duration: 0.3 });
  }
}