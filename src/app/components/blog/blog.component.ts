import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';
import { ScrollService } from '../../services/scroll.service';
import { HeroComponent } from '../shared/hero/hero.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, HeroComponent, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, AfterViewInit {
  allPosts = signal<BlogPost[]>([]);
  featuredPosts = signal<BlogPost[]>([]);
  selectedCategory = signal<string>('All');
  categories = signal<string[]>(['All']);

  constructor(
    private blogService: BlogService,
    private scrollService: ScrollService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      if (categoryId) {
        this.filterByCategory(categoryId);
      } else {
        this.allPosts.set(this.blogService.getBlogPosts());
        this.featuredPosts.set(this.blogService.getFeaturedPosts());
        this.categories.set(['All', ...this.blogService.getCategories()]);
        this.titleService.setTitle('Deal Dissekt | Insights');
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollService.initScrollAnimations();
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    if (category === 'All') {
      this.allPosts.set(this.blogService.getBlogPosts());
      this.titleService.setTitle('Deal Dissekt | Insights');
    } else {
      this.allPosts.set(this.blogService.getPostsByCategory(category));
      this.titleService.setTitle(`Deal Dissekt | ${category}`);
    }
    this.scrollService.initScrollAnimations();
  }

  get filteredPosts(): BlogPost[] {
    return this.allPosts();
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
