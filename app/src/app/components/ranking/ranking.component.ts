import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap, map, Subscription } from 'rxjs';
import { Player, PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit, OnDestroy {
  playerList$: Observable<Player[]> | undefined;
  firstPlayer: Player | undefined;
  secondPlayer: Player | undefined;
  thirdPlayer: Player | undefined;
  sub: Subscription | undefined;

  constructor(private readonly playersService: PlayersService) {}

  ngOnInit(): void {
    this.sub = this.playersService.players$.subscribe((players) => {
      this.firstPlayer = players[0];
      this.secondPlayer = players[1];
      this.thirdPlayer = players[2];
    });
    this.playerList$ = this.playersService.players$.pipe(
      map((players) => players.slice(3))
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
