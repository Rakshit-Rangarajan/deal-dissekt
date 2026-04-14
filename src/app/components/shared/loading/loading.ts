import { Component, OnInit, signal, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-overlay" [class.fade-out]="isFadingOut()" *ngIf="isVisible()">
      <div class="loader-content">
        <div class="logo-wrapper">
          <img src="/assets/images/logo.png" alt="Deal Dissekt" class="loader-logo">
          <div class="logo-glow"></div>
        </div>
        <div class="loading-bar">
          <div class="bar-progress"></div>
        </div>
      </div>
      <div class="loading-bg">
        <div class="grid-layer"></div>
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #0D0D0B;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.fade-out {
        opacity: 0;
        pointer-events: none;
      }
    }

    .loader-content {
      position: relative;
      z-index: 2;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
    }

    .logo-wrapper {
      position: relative;
      animation: logo-entrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .loader-logo {
      height: 88px;
      width: auto;
      position: relative;
      z-index: 1;
    }

    .logo-glow {
      position: absolute;
      inset: -24px;
      background: #C8A96E;
      filter: blur(48px);
      opacity: 0.2;
      border-radius: 50%;
      animation: pulse-glow 2.5s infinite;
    }

    .loading-bar {
      width: 180px;
      height: 2px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 1px;
      overflow: hidden;
      
      .bar-progress {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #C8A96E, #D9C094);
        transform: translateX(-100%);
        animation: progress-fill 3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
      }
    }

    .loading-bg {
      position: absolute;
      inset: 0;
      
      .grid-layer {
        position: absolute;
        inset: 0;
        background-image: 
          repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(200,169,110,0.03) 59px, rgba(200,169,110,0.03) 60px),
          repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(200,169,110,0.02) 59px, rgba(200,169,110,0.02) 60px);
      }

      .orb {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        filter: blur(150px);
        opacity: 0.10;
      }

      .orb-1 {
        background: #C8A96E;
        top: -100px;
        left: -100px;
        animation: orb-float 10s infinite alternate;
      }

      .orb-2 {
        background: #D94F3B;
        bottom: -100px;
        right: -100px;
        animation: orb-float 8s infinite alternate-reverse;
      }
    }

    @keyframes logo-entrance {
      from { transform: scale(0.7) translateY(16px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }

    @keyframes progress-fill {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }

    @keyframes orb-float {
      from { transform: translate(0, 0); }
      to { transform: translate(40px, 40px); }
    }

    @keyframes pulse-glow {
      0%, 100% { opacity: 0.15; }
      50% { opacity: 0.3; }
    }

    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `]
})
export class LoadingComponent implements OnInit {
  isVisible = signal(true);
  isFadingOut = signal(false);

  @Output() completed = new EventEmitter<void>();

  ngOnInit(): void {
    // Automatically finish loading after 3 seconds
    setTimeout(() => this.finishLoading(), 3000);
  }

  @HostListener('window:keydown.enter')
  onEnterPressed(): void {
    if (this.isVisible()) {
      this.finishLoading();
    }
  }

  private finishLoading(): void {
    if (this.isFadingOut()) return;

    this.isFadingOut.set(true);
    setTimeout(() => {
      this.isVisible.set(false);
      this.completed.emit();
    }, 800);
  }
}
