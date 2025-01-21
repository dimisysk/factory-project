import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { CrudNavbarComponent } from './components/crud/crud-navbar/crud-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CrudNavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fronend-project';
}
