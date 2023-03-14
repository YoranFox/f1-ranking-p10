import { Component, HostListener } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  me = '';
  constructor(private readonly playersService: PlayersService) {
    this.me = this.playersService.me;
  }
}
