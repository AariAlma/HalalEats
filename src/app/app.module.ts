import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterModule] // Example of importing RouterModule directly in a standalone component
})


@NgModule({
  declarations: [
    // other components
    LoginComponent, // Assuming LoginComponent is the component using ngModel
  ],
  imports: [
    // other modules
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class LoginComponent {}
export class AppModule {}
