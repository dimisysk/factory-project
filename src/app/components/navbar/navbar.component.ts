import { Component, inject, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service'; 

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [MatIconModule,RouterLink,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService);
  user = this.authService.user;

  logout() {
    this.authService.logout();
  }

}
