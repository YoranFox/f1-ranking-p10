import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { drivers } from '../data/drivers';
import { getNextRace, schedule } from '../data/schedule';
import { Prediction, PredictionsService } from '../store/predictions.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
})
export class PredictComponent implements OnInit {
  drivers = drivers.MRData.DriverTable.Driver;
  selectedRetirementDriver: any;
  selectedP10Driver: any;

  changeP10 = true;
  changeRetirement = true;

  nextRace = getNextRace();

  constructor(
    private predictionsService: PredictionsService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const prediction = new Prediction();
    prediction.p10 = this.selectedP10Driver.PermanentNumber;
    prediction.retirement = this.selectedRetirementDriver.PermanentNumber;
    prediction.raceName = this.nextRace?.RaceName;
    const userId = localStorage.getItem('me');
    if (!userId) {
      this.router.navigateByUrl('');
      return;
    }
    prediction.userId = userId;
    // prediction.id = this.afs.createId();
    this.predictionsService.create(prediction).then((doc) => {
      this.router.navigateByUrl('home');
    });
  }

  onSelectP10(driver: any) {
    this.selectedP10Driver = driver;
    this.changeP10 = false;
  }

  onSelectRetirement(driver: any) {
    this.selectedRetirementDriver = driver;
    this.changeRetirement = false;
  }
}
