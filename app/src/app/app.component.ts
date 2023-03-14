import { Component } from '@angular/core';
import { PlayersService } from './services/players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  constructor(private s: PlayersService) {}
}
