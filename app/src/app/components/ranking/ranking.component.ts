import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap, map, Subscription, Subject, takeUntil } from 'rxjs';
import { Player, PlayersService } from 'src/app/services/players.service';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit, OnDestroy {
  playerList: Player[] | undefined;
  firstPlayer: Player | undefined;
  secondPlayer: Player | undefined;
  thirdPlayer: Player | undefined;
  playerPoints: { [playerName: string]: number } = {};

  unsubscribeAll = new Subject();

  constructor(private readonly resultsService: ResultsService) {}

  ngOnInit(): void {
    this.resultsService.results$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((results) => {
        this.playerPoints = {};
        results.forEach((r) => {
          const points = r.p10.points + r.retire.points;
          this.playerPoints[r.playerName]
            ? (this.playerPoints[r.playerName] += points)
            : (this.playerPoints[r.playerName] = points);
        });

        this.playerList = Object.entries(this.playerPoints)
          .sort((a, b) => b[1] - a[1])
          .map((p) => ({ name: p[0], points: p[1] }));

        this.firstPlayer = this.playerList[0];
        this.secondPlayer = this.playerList[1];
        this.thirdPlayer = this.playerList[2];

        this.playerList = this.playerList.slice(3);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
