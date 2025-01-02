import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RestCountriesService } from '../../services/rest-countries.service';

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

  constructor(private restCountriesService: RestCountriesService) {
    this.restCountriesService.getAllCountries().subscribe((data: any[]) => {
      console.log(data);
      this.countries = data;
    });
  }

  onCountryChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const value: string = target.value;

    this.countryFlagUrl = this.countries.find((country) => country.name.common === value).flags.png;
    console.log(this.countryFlagUrl);
  }
}
