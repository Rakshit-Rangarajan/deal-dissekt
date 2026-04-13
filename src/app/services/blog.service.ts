import { Injectable } from '@angular/core';
import { BlogPost, Project } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogPosts: BlogPost[] = [
    // --- DEAL INSIGHTS ---
    {
      id: 'deal-1',
      title: 'Structural Nuances in Cross-Border M&A',
      excerpt: 'Navigating the tax and regulatory complexities of international deal structures in a high-interest rate environment.',
      content: `
        <h2>The Architecture of Global Transactions</h2>
        <p>Cross-border M&A involves navigating multiple legal systems, tax regimes, and cultural differences. In this insight, we dissekt why "Stock vs Asset" purchase decisions change across borders.</p>
        <h3>FEMA and FDI Considerations</h3>
        <p>In the Indian context, any cross-border transaction must first clear the hurdles of the Foreign Exchange Management Act (FEMA). Understanding the 'Automatic Route' vs 'Approval Route' is step one for any serious deal maker.</p>
        <blockquote>"The most elegant deal structure is the one that minimizes friction during integration, not just the one that saves on taxes today."</blockquote>
        <p>We'll also look at 'Deferred Consideration' and how earn-outs are treated under current regulatory frameworks.</p>
      `,
      category: 'Deal Insights',
      tags: ['M&A', 'Tax', 'Cross-Border'],
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      readTime: '10 min read',
      publishDate: '2024-03-20',
      author: 'Abhishek Venkatesh',
      featured: true
    },
    {
      id: 'deal-2',
      title: 'The Art of the LBO: Value Creation strategies',
      excerpt: 'How Private Equity firms use leverage and operational improvements to drive outsized returns in mid-market deals.',
      content: `
        <h2>De-leveraging Debt into Equity Value</h2>
        <p>Leveraged Buyouts (LBOs) are often misunderstood as mere financial engineering. However, the best LBOs are driven by operational alpha.</p>
        <h3>The Debt-Service Coverage Ratio (DSCR)</h3>
        <p>A successful LBO hinges on the target company's ability to service its debt. We analyze how to model cash flows to ensure a safety margin of at least 1.5x.</p>
      `,
      category: 'Deal Insights',
      tags: ['PE', 'LBO', 'Finance'],
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
      readTime: '12 min read',
      publishDate: '2024-03-15',
      author: 'Abhishek Venkatesh'
    },

    // --- DSTREET DISSEKT ---
    {
      id: 'dstreet-1',
      title: 'DStreet Review: Q1 2024 Market Trends',
      excerpt: 'A deep dive into Dalal Street performance, identifying mid-cap sectors poised for growth despite global headwinds.',
      content: `
        <h2>Market sentiment and the Indian Economy</h2>
        <p>The Nifty 50 has shown remarkable resilience. In this DStreet Dissekt, we look at why the manufacturing sector (PLI schemes) is the new darling of retail investors.</p>
        <h3>The Rise of Systematic Investment</h3>
        <p>SIP inflows have hit record highs. We analyze the impact of domestic liquidity on preventing market crashes during FII sell-offs.</p>
      `,
      category: 'DStreet Dissekt',
      tags: ['Stock Market', 'India', 'Finance'],
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      readTime: '8 min read',
      publishDate: '2024-03-18',
      author: 'Abhishek Venkatesh',
      featured: true
    },
    {
      id: 'dstreet-2',
      title: 'Demystifying IPO Valuations: Beyond the Hype',
      excerpt: 'Learn how to read an RHP (Red Herring Prospectus) like a pro and distinguish between a "Great Company" and a "Great Investment".',
      content: `
        <h2>The IPO Boom: FOMO vs Fundamentals</h2>
        <p>With dozens of tech-startups hitting the market, valuation multiplies are being stretched. We dissekt the difference between P/E and EV/EBITDA in an Indian context.</p>
      `,
      category: 'DStreet Dissekt',
      tags: ['IPO', 'Valuation', 'DStreet'],
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
      readTime: '9 min read',
      publishDate: '2024-03-10',
      author: 'Abhishek Venkatesh'
    },

    // --- REGULATORY UPDATES ---
    {
      id: 'reg-1',
      title: 'Breaking Down the 2024 SEBI Circulars',
      excerpt: 'A simplified analysis of the new disclosure norms for Foreign Portfolio Investors (FPIs) and their impact on market transparency.',
      content: `
        <h2>Transparency vs Complexity</h2>
        <p>SEBI\'s recent mandate on ultimate beneficial ownership has sent waves through the FPI community. We break down what this means for investors from tax-haven jurisdictions.</p>
      `,
      category: 'Regulatory Updates',
      tags: ['SEBI', 'Regulatory', 'FPI'],
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
      readTime: '15 min read',
      publishDate: '2024-03-25',
      author: 'Abhishek Venkatesh'
    },
    {
      id: 'reg-2',
      title: 'RBI Monetary Policy: Decoding the Stance',
      excerpt: 'Why "Withdrawal of Accommodation" matters to your home loan and the broader banking sector.',
      content: `
        <h2>The Inflation Tug-of-War</h2>
        <p>The RBI Governor\'s latest speech hinted at a 'higher for longer' rate regime. We analyze the Liquidity Adjustment Facility (LAF) and its impact on bank margins.</p>
      `,
      category: 'Regulatory Updates',
      tags: ['RBI', 'Economy', 'Banking'],
      imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
      readTime: '7 min read',
      publishDate: '2024-03-05',
      author: 'Abhishek Venkatesh'
    },

    // --- TAX DISSEKT ---
    {
      id: 'tax-1',
      title: 'GAAR 2.0: Navigating Anti-Avoidance Rules',
      excerpt: 'Practical examples of how the General Anti-Avoidance Rules are being applied to corporate restructurings in 2024.',
      content: `
        <h2>Substance over Form</h2>
        <p>GAAR is no longer a ghost of the future; it\'s the reality of today. We dissekt recent CIT(A) orders to understand where the Taxman is drawing the line between planning and avoidance.</p>
      `,
      category: 'Tax Dissekt',
      tags: ['Income Tax', 'GAAR', 'Corporate Tax'],
      imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800',
      readTime: '11 min read',
      publishDate: '2024-03-22',
      author: 'Abhishek Venkatesh',
      featured: true
    },
    {
      id: 'tax-2',
      title: 'Taxation of Startup ESOPs: A Founder\'s Guide',
      excerpt: 'Understanding the dual-taxation event and the new rules for deferring tax on ESOP exercises.',
      content: `
        <h2>Unlocking Wealth, Minimizing Tax</h2>
        <p>For many startups, ESOPs are the main wealth creation tool. We explain Section 80-IAC and how eligible startups can provide tax relief to their employees.</p>
      `,
      category: 'Tax Dissekt',
      tags: ['Startups', 'ESOP', 'Tax'],
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
      readTime: '8 min read',
      publishDate: '2024-03-12',
      author: 'Abhishek Venkatesh'
    },

    // --- STARTUP INSIGHTS ---
    {
      id: 'startup-1',
      title: 'FinTech 2.0: The Shift from Growth to Profitability',
      excerpt: 'Why the era of "Burn-to-Grow" is over and how Indian FinTechs are pivoting to sustainable unit economics.',
      content: `
        <h2>The Maturation of the Ecosystem</h2>
        <p>From UPI to credit-on-tap, Indian FinTech has won the top-of-funnel game. Now comes the hard part: making money. We analyze the business models of the latest Unicorns.</p>
      `,
      category: 'Startup Insights',
      tags: ['Startups', 'FinTech', 'Unicorn'],
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      readTime: '9 min read',
      publishDate: '2024-03-24',
      author: 'Abhishek Venkatesh',
      featured: true
    },
    {
      id: 'startup-2',
      title: 'The "Inverse" Due Diligence Guide',
      excerpt: 'What founders should look for in their VCs before signing a term sheet.',
      content: `
        <h2>Choosing your Partner</h2>
        <p>A VC is a 10-year marriage. We dissekt the importance of 'Value-Add' vs 'Interference' and how to check a VC's track record during bridge rounds.</p>
      `,
      category: 'Startup Insights',
      tags: ['VC', 'Founders', 'Startup Life'],
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      readTime: '10 min read',
      publishDate: '2024-03-02',
      author: 'Abhishek Venkatesh'
    }
  ];

  private projects: Project[] = []; // Projects removed as requested

  getBlogPosts(): BlogPost[] {
    return this.blogPosts;
  }

  getFeaturedPosts(): BlogPost[] {
    return this.blogPosts.filter(post => post.featured);
  }

  getPostById(id: string): BlogPost | undefined {
    return this.blogPosts.find(post => post.id === id);
  }

  getPostsByCategory(category: string): BlogPost[] {
    return this.blogPosts.filter(post => post.category === category);
  }

  getCategories(): string[] {
    return ['Deal Insights', 'DStreet Dissekt', 'Regulatory Updates', 'Tax Dissekt', 'Startup Insights'];
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}
