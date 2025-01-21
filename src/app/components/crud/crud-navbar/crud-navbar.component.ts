import { Component,Inject } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-crud-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './crud-navbar.component.html',
  styleUrl: './crud-navbar.component.css'
})
export class CrudNavbarComponent {

  userRole: string | null = null;

  constructor(public authService: AuthService) {
  }

}
