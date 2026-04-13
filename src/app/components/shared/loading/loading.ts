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
        <p class="skip-hint">Press <span>ENTER</span> to dive in</p>
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
      background: #0F0F1A;
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
      gap: 40px;
    }

    .logo-wrapper {
      position: relative;
      animation: logo-entrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .loader-logo {
      height: 100px;
      width: auto;
      position: relative;
      z-index: 1;
    }

    .logo-glow {
      position: absolute;
      inset: -20px;
      background: var(--primary);
      filter: blur(40px);
      opacity: 0.3;
      border-radius: 50%;
      animation: pulse-glow 2s infinite;
    }

    .loading-bar {
      width: 200px;
      height: 4px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 2px;
      overflow: hidden;
      
      .bar-progress {
        width: 100%;
        height: 100%;
        background: var(--gradient-primary);
        transform: translateX(-100%);
        animation: progress-fill 3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
      }
    }

    .skip-hint {
      color: var(--text-muted);
      font-size: 0.9rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0;
      animation: fadeIn 0.5s ease 1.5s forwards;

      span {
        color: var(--primary-light);
        font-weight: 700;
        padding: 4px 8px;
        background: rgba(108, 60, 225, 0.1);
        border: 1px solid rgba(108, 60, 225, 0.3);
        border-radius: 4px;
        margin: 0 4px;
      }
    }

    .loading-bg {
      position: absolute;
      inset: 0;
      
      .grid-layer {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(108, 60, 225, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(108, 60, 225, 0.05) 1px, transparent 1px);
        background-size: 80px 80px;
      }

      .orb {
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        filter: blur(150px);
        opacity: 0.15;
      }

      .orb-1 {
        background: var(--primary);
        top: -100px;
        left: -100px;
        animation: orb-float 10s infinite alternate;
      }

      .orb-2 {
        background: var(--secondary);
        bottom: -100px;
        right: -100px;
        animation: orb-float 8s infinite alternate-reverse;
      }
    }

    @keyframes logo-entrance {
      from { transform: scale(0.5) translateY(20px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }

    @keyframes progress-fill {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }

    @keyframes orb-float {
      from { transform: translate(0, 0); }
      to { transform: translate(50px, 50px); }
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
