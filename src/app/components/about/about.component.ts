import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {
  profileImage = '/assets/images/abhishek-dp.jpg';

  experience = [
    {
      icon: 'briefcase',
      title: 'M&A and PE Advisory',
      description: 'Transaction Tax Manager at EY, specializing in Mergers & Acquisitions tax advisory for key M&A and Private Equity funds.'
    },
    {
      icon: 'trending-up',
      title: 'Group Restructuring',
      description: 'Advisory on group restructuring and tax efficiency from an Indian tax and regulatory perspective.'
    },
    {
      icon: 'bar-chart',
      title: 'Tax Advisory',
      description: 'Experience in tax advisory and regulatory compliance across various industries and deal structures.'
    }
  ];

  education = [
    {
      degree: 'CFA Charterholder',
      institution: 'CFA Institute',
      year: '2024',
      description: 'Chartered Financial Analyst (CFA) Charter conferred in Jan 2024.'
    },
    {
      degree: 'Chartered Accountant (CA)',
      institution: 'ICAI',
      year: '2018',
      description: 'Qualified Chartered Accountant with expertise in taxation and corporate laws.'
    },
    {
      degree: 'Financial Modelling',
      institution: 'Wall Street Prep',
      year: '2023',
      description: 'Completed Financial Statement Modelling Course covering advanced valuation techniques.'
    }
  ];

  interests = [
    { icon: 'book', label: 'Financial Research' },
    { icon: 'globe', label: 'Market Analysis' },
    { icon: 'chart', label: 'Valuations' },
    { icon: 'briefcase', label: 'Deal Structuring' },
    { icon: 'trending-up', label: 'PE Insights' },
    { icon: 'code', label: 'Data Analytics' }
  ];

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.scrollService.initScrollAnimations();
  }
}
