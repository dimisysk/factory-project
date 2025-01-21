import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterLink,RouterOutlet,RegistrationFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

