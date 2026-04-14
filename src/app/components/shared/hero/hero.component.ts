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
  tickerTopics: string[] = [
    'M&A Structures',
    'PE Fund Analysis',
    'SEBI Regulations',
    'Tax Efficiency',
    'Deal Valuation',
    'Group Restructuring',
    'Capital Markets',
    'Startup Funding',
    'IBC / Insolvency',
    'Transfer Pricing',
  ];

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
