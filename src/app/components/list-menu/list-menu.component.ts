import { Component } from '@angular/core';
import { MenuItem } from 'src/app/shared/interface/menu-item';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip'

@Component({
  selector: 'app-list-menu',
  imports: [RouterLink, RouterLinkActive,MatIconModule,MatTooltipModule],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css',
})
export class ListMenuComponent {
  
  role: string | null = null; 
  menu: MenuItem[] = [
    {
      text: 'Store',
      routerLink: '/customer/dashboard',
      roles: ['CUSTOMER', 'ADMIN'],
      icon: 'store',
      tooltip: 'Visit the store',
    },
    {
      text: 'All Products',
      routerLink: '/product/all',
      roles: ['CUSTOMER', 'ADMIN'],
      icon: 'shopping_cart',
    },
    {
      text: 'Get All Customers',
      routerLink: '/customer/get-all',
      roles: ['ADMIN'],
      icon: 'group',
    },
    {
      text: 'Update Customer',
      routerLink: '/customers/update/:id',
      roles: ['ADMIN'],
    },
    { text: 'Create product', routerLink: '/product/create', roles: ['ADMIN'],icon: 'add_circle' },
  ];

  constructor(public authService: AuthService) {}

  get filteredMenu(): MenuItem[] {
    
    return this.menu.filter(
      (item) => !item.roles || item.roles.includes(this.role!),
    );
  }
  
}
