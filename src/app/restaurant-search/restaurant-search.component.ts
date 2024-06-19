import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.services'
@Component({
  selector: 'app-restaurant-search',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit{
  keyword = 'food';
  maxprice = '';
  opennow = false;
  radius = '2';
  restaurants: any[] = [];
  loading = false;
  errorMessage = '';

  constructor (private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.searchRestaurants();
  }

  searchRestaurants(): void {
    this.loading = true;
    this.errorMessage = '';

    this.restaurantService.getCurrentLocation().then(
      coords => {
        const { lat, lng } = coords;

        this.restaurantService.searchRestaurants(
          lat,
          lng,
          this.keyword,
          this.maxprice,
          this.opennow,
          parseFloat(this.radius) * 1
        ).subscribe(
            data => {
              this.restaurants = data;
              this.loading = false;
            },
            error => {
              this.errorMessage = error.message;
              this.loading = false;
            }
          );
      },
      error => {
        this.errorMessage = 'Unable to retrieve current location';
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    this.searchRestaurants();
  }

}
