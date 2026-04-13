import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent) 
  },
  { 
    path: 'blog/:id', 
    loadComponent: () => import('./components/blog/blog-post/blog-post.component').then(m => m.BlogPostComponent) 
  },
  { 
    path: 'category/:id', 
    loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
