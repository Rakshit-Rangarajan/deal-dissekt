import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abhishekv23995/', icon: 'linkedin' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
    { name: 'GitHub', url: '#', icon: 'github' }
  ];

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Deal Insights', path: '/category/Deal Insights' },
    { label: 'DStreet Dissekt', path: '/category/DStreet Dissekt' },
    { label: 'Regulatory Updates', path: '/category/Regulatory Updates' },
    { label: 'Tax Dissekt', path: '/category/Tax Dissekt' },
    { label: 'Startup Insights', path: '/category/Startup Insights' },
    { label: 'About Me', path: '/about' }
  ];

  categories = [
    'Deal Insights',
    'DStreet Dissekt',
    'Regulatory Updates',
    'Tax Dissekt',
    'Startup Insights'
  ];
}
