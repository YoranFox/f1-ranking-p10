import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { drivers } from '../data/drivers';
import { getNextRace } from '../data/schedule';
import { Player, PlayersService } from '../store/players.service';
import { Prediction, PredictionsService } from '../store/predictions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public players: Player[] = [];
  loading = false;
  maxPoints: number = 100000;
  hasPrediction = false;
  myPrediction: Prediction | null = null;
  nextRace = getNextRace();
  me: Player | undefined;

  constructor(
    private playersService: PlayersService,
    private router: Router,
    private predictionsService: PredictionsService
  ) {}

  public rankingWdth(points: number) {
    this.maxPoints = Math.max(...this.players.map((p) => p.points));
    return (85 / this.maxPoints) * points + '%';
  }

  async ngOnInit() {
    this.loading = true;
    if (!this.nextRace) {
      return;
    }

    const me = localStorage.getItem('me');
    if (!me) {
      this.router.navigateByUrl('');
      return;
    }

    this.playersService.getOne(me).then((player) => {
      this.me = player.docs[0].data();
      if (!this.me || !this.me.name) {
        this.router.navigateByUrl('');
        return;
      }

      if (!this.nextRace) {
        return;
      }

      this.predictionsService
        .userRacePrediction(this.nextRace.RaceName, this.me.name)
        .then((prediction) => {
          this.myPrediction = prediction;
          this.loading = false;
        });

      this.fetchPlayers();
    });
  }

  fetchPlayers() {
    this.playersService
      .getAll()
      .get()
      .subscribe((players) => {
        players.forEach((player) => this.players.push(player.data()));
        console.log(this.players);
      });
  }

  goToPredict() {
    this.router.navigateByUrl('predict');
  }

  getDriverName(number: number | undefined) {
    const driver = drivers.MRData.DriverTable.Driver.find(
      (driver) => driver.PermanentNumber === number
    );
    if (!driver) {
      return 'oops';
    }
    return driver.GivenName + ' ' + driver.FamilyName;
  }
}
