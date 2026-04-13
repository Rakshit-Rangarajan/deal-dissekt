import { Component, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  mouseX = signal(0);
  mouseY = signal(0);
  
  private cleanup: (() => void) | null = null;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.cleanup) {
      this.cleanup();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;
    this.mouseX.set(x);
    this.mouseY.set(y);
  }
}
