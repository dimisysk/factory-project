import { Component, inject, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service'; 
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [MatIconModule,RouterLink,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {

  authService = inject(AuthService);
  user = this.authService.user;
  ngAfterViewInit(): void {
    const navbarToggle = document.querySelector('.navbar-toggler') as HTMLElement;
    navbarToggle.addEventListener('click', () => {
      const target = document.querySelector('#navbarContent');
      if (target?.classList.contains('show')) {
        target.classList.remove('show');
      } else {
        target?.classList.add('show');
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
