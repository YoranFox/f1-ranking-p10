import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  playerName: string = '';

  constructor(
    private readonly playersService: PlayersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.playersService.me) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.playersService.players$
      .subscribe((players) => {
        console.log(players);

        if (players.some((player) => player.name === this.playerName)) {
          localStorage.setItem('me', this.playerName);
          this.router.navigate(['']);
        } else {
          this.playersService.create(this.playerName).then(() => {
            localStorage.setItem('me', this.playerName);
            this.router.navigate(['']);
          });
        }
      })
      .unsubscribe();
  }
}