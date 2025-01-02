import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'news-view-component',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './news-view.component.html',
  styleUrl: './news-view.component.css'
})
export class NewsViewComponent {
  constructor(private newsService: NewsService){}
  news:any[] = [];
  componentInit: boolean = false;
  search = '';
  requestLimit: boolean = false;

  ngOnInit(): void {
    this.newsService.requestLimitSubject.subscribe((limitReached) => {
      this.requestLimit = limitReached;
      console.log('Request Limit:', this.requestLimit);

      if (!this.requestLimit) {
        this.getNews('');
      } else {
        console.log('API limit reached. Please try again later.');
      }
    });
  }

  getNews(search:string): void{
    this.newsService.getNewsByCountry(search).subscribe((data: any) => {
      this.news = data.articles;
    });

    if(this.news.length > 0){
      this.componentInit = true;
    }
  }

  searchNews(searchTerm: Event): void{
    this.search = (searchTerm.target as HTMLInputElement).value;
    this.getNews(this.search);
    this.search = '';
  }
}
