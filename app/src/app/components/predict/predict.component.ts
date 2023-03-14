import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { drivers, getDriver } from 'src/app/data/drivers';
import { getRace } from 'src/app/data/schedule';
import { PlayersService } from 'src/app/services/players.service';
import { PredictionsService } from 'src/app/services/predictions.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
})
export class PredictComponent implements OnInit {
  raceNumber: number | undefined;

  getRace = getRace;
  getDriver = getDriver;

  selectedP10: number | undefined;
  selectedRetire: number | undefined;

  drivers = drivers.MRData.DriverTable.Driver;

  changeP10 = true;
  changeRetire = true;

  constructor(
    private route: ActivatedRoute,
    private readonly predictionsService: PredictionsService,
    private readonly playersService: PlayersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => (this.raceNumber = params['raceNumber'])
    );
  }

  selectP10(driverNumber: number) {
    this.selectedP10 = driverNumber;
  }

  selectRetire(driverNumber: number) {
    this.selectedRetire = driverNumber;
  }

  onSubmit() {
    if (!this.raceNumber || !this.selectedP10 || !this.selectedRetire) {
      return;
    }
    this.predictionsService
      .create({
        playerName: this.playersService.me,
        raceNumber: this.raceNumber,
        p10: this.selectedP10,
        retire: this.selectedRetire,
      })
      .then(() => {
        this.onBack();
      });
  }

  onBack() {
    this.router.navigate(['']);
  }

  onSelectP10(driverNumber: number) {
    this.selectedP10 = driverNumber;
    this.changeP10 = false;
  }

  onSelectRetire(driverNumber: number) {
    this.selectedRetire = driverNumber;
    this.changeRetire = false;
  }
}
