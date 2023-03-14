import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDriver } from 'src/app/data/drivers';
import { getNextRaceNumber, getRace, schedule } from 'src/app/data/schedule';
import { PlayersService } from 'src/app/services/players.service';
import {
  Prediction,
  PredictionsService,
} from 'src/app/services/predictions.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
})
export class RacesComponent implements OnInit, AfterViewInit {
  races = schedule.MRData.RaceTable.Race;
  getDriver = getDriver;
  getRace = getRace;
  selectedRace: number = getNextRaceNumber();
  results: any[] = [];

  predictions: Prediction[] = [];

  constructor(
    private readonly predictionsService: PredictionsService,
    private readonly playersService: PlayersService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.scrollToCard();
  }

  ngOnInit() {
    this.predictionsService
      .getPredictionsByPlayer(this.playersService.me)
      .subscribe((p) => (this.predictions = p));
  }

  scrollToCard() {
    if (!this.selectedRace) {
      return;
    }
    var elem = document.getElementById(
      'card-' + getRace(this.selectedRace)?.Date
    );

    if (!elem) {
      return;
    }

    var leftPos = elem.offsetLeft;

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    function scrollTo(element: any, to: any, duration: number) {
      var start = element.scrollLeft,
        change = to - start,
        currentTime = 0,
        increment = 20;

      var animateScroll = function () {
        currentTime += increment;
        var val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
      animateScroll();
    }

    scrollTo(document.getElementById('card-wrapper'), leftPos - 20, 600);
  }

  getPrediction(raceNumber: number) {
    return this.predictions.find((p) => p.raceNumber === raceNumber);
  }

  onSelectRace(raceNumber: number) {
    this.selectedRace = raceNumber;
    this.scrollToCard();
  }

  inPast(date: string) {
    return new Date() > new Date(date);
  }

  doPrediction(raceNumber: number) {
    console.log(raceNumber);

    this.router.navigate(['predict', raceNumber]);
  }
}
