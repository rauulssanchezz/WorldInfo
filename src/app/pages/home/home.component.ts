import { Component } from '@angular/core';
import { CountrySelectorComponent } from "../../components/country-selector/country-selector.component";

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CountrySelectorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomePageComponent {

}
