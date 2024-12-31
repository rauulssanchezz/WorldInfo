import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RestCountriesService } from '../../services/rest-countries.service';

@Component({
  selector: 'country-selector-component',
  standalone: true,
  imports: [NgFor],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})
export class CountrySelectorComponent {
  countries: any[] = [];
  filteredCountries: any[] = [];

  constructor(private restCountriesService: RestCountriesService) {
    this.restCountriesService.getAllCountries().subscribe((data: any[]) => {
      console.log(data);
      this.countries = data;
      this.filteredCountries = data;
    });
  }

  onSearch(search: Event){
    const searchCountry = (search.target as HTMLInputElement).value.toLowerCase();
    console.log('Input:'+(search.target as HTMLInputElement).value);
    console.log('Search:'+searchCountry);
    if(searchCountry === '') {
      this.filteredCountries = this.countries;
      return;
    }
    this.filteredCountries = this.countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchCountry);
    });
  }

  onCountryChange(event: any) {
  }
}
