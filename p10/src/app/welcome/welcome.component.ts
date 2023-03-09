import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Player, PlayersService } from '../store/players.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  playerName: string = '';

  constructor(
    private readonly playersService: PlayersService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('me')) {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    const player = new Player();
    player.name = this.playerName;
    // player.id = this.afs.createId();

    this.playersService.getOne(this.playerName).then((doc) => {
      if (!doc.empty) {
        localStorage.setItem('me', this.playerName);
        this.router.navigate(['home']);
      } else {
        this.playersService.create(player).then((doc) => {
          localStorage.setItem('me', this.playerName);
          this.router.navigate(['home']);
        });
      }
    });
  }
}
