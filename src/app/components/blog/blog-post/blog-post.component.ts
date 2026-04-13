import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog.model';
import { ScrollService } from '../../../services/scroll.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit, AfterViewInit {
  post = signal<BlogPost | undefined>(undefined);
  relatedPosts = signal<BlogPost[]>([]);

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      window.scrollTo(0, 0);
      const id = params['id'];
      if (id) {
        const foundPost = this.blogService.getPostById(id);
        this.post.set(foundPost);
        
        if (foundPost) {
          const allPosts = this.blogService.getBlogPosts();
          this.relatedPosts.set(
            allPosts
              .filter(p => p.id !== id && p.category === foundPost.category)
              .slice(0, 3)
          );
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollService.initScrollAnimations();
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
}
