import { Component } from '@angular/core';
import { CountrySelectorComponent } from "../../components/country-selector/country-selector.component";
import { NewsViewComponent } from "../../components/news-view/news-view.component";

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CountrySelectorComponent, NewsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomePageComponent {

}
