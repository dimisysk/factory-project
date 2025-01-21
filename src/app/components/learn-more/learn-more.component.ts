import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-learn-more',
  imports: [RouterLink],
  templateUrl: './learn-more.component.html',
  styleUrl: './learn-more.component.css'
})
export class LearnMoreComponent {

  title = 'Learn More About Us';
  description = 'Here you can find detailed information about our services, team, and mission.';
}


