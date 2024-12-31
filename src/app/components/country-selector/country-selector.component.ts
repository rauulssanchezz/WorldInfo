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

  constructor(private restCountriesService: RestCountriesService) {
    this.restCountriesService.getAllCountries().subscribe((data: any[]) => {
      console.log(data);
      this.countries = data;
    });
  }

  onSearch(search: Event){
    const searchCountry = (search.target as HTMLInputElement).value.toLowerCase();
    if(searchCountry === '') {
      this.restCountriesService.getAllCountries().subscribe((data: any[]) => {
        this.countries = data;
      });
      return;
    }
    this.countries = this.countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchCountry);
    });
  }

  onCountryChange(event: any) {
  }
}
