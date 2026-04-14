import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading';
import { CursorComponent } from './components/shared/cursor/cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingComponent, CursorComponent],
  template: `
    <app-cursor></app-cursor>
    <app-loading></app-loading>
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class App {}
