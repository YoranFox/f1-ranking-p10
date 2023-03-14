import { Component, HostListener, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  me = '';
  constructor(private readonly playersService: PlayersService) {
    this.me = this.playersService.me;
  }
  ngOnInit(): void {
    this.me = this.playersService.me;
  }
}
