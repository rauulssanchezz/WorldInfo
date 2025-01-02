import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RestCountriesService } from '../../services/rest-countries.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'country-selector-component',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})
export class CountrySelectorComponent {
  countries: any[] = [];
  countryFlagUrl: string = '';

  constructor(private restCountriesService: RestCountriesService, private newsService: NewsService) {
    this.restCountriesService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    });
  }

  onCountryChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const value: string = target.value;

    this.countryFlagUrl = this.countries.find((country) => country.name.common === value).flags.png;
    this.newsService.refreshCountryName(value);
  }
}
