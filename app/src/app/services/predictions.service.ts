import { Injectable } from '@angular/core';
import { Unsubscribe } from '@angular/fire/app-check';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ref, onValue, set, DatabaseReference } from 'firebase/database';
import { Subject } from 'rxjs';

export interface Prediction {
  playerName: string;
  raceNumber: number;
  p10: number;
  retire: number;
}

export interface PredictionsStored {
  [playerName: string]: PredictionsStoredPlayer;
}

export interface PredictionsStoredPlayer {
  [raceNumber: number]: { p10: number; retire: number };
}

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  private predictionsRef: DatabaseReference;
  private predictionsSubject: Subject<Prediction[]> = new Subject<
    Prediction[]
  >();
  private unsubscribePredictByPlayer: Unsubscribe | undefined;

  public predictions$ = this.predictionsSubject.asObservable();

  constructor(private db: AngularFireDatabase) {
    this.predictionsRef = ref(db.database, 'predictions');

    onValue(this.predictionsRef, (snapshot) => {
      const data = snapshot.val() as PredictionsStored;
      const predictions = this.transformPredictStoreData(data);
      this.predictionsSubject.next(predictions);
    });
  }

  getPredictionsByPlayer(playerName: string) {
    if (this.unsubscribePredictByPlayer) {
      this.unsubscribePredictByPlayer();
    }

    const playerPredictionsRef = ref(
      this.db.database,
      'predictions/' + playerName
    );
    const subscriber = new Subject<Prediction[]>();
    onValue(playerPredictionsRef, (snapshot) => {
      const data = snapshot.val() as PredictionsStoredPlayer;
      const predictions = this.transformPlayerPredictStoreData(
        playerName,
        data
      );
      subscriber.next(predictions);
    });

    return subscriber.asObservable();
  }

  create(prediction: Prediction) {
    return set(
      ref(
        this.db.database,
        `predictions/${prediction.playerName}/${prediction.raceNumber}`
      ),
      {
        p10: prediction.p10,
        retire: prediction.retire,
      }
    );
  }

  private transformPredictStoreData(
    storeData: PredictionsStored
  ): Prediction[] {
    return Object.entries(storeData).flatMap(([playerName, data]) => {
      return this.transformPlayerPredictStoreData(playerName, data);
    });
  }

  private transformPlayerPredictStoreData(
    playerName: string,
    storeData: PredictionsStoredPlayer
  ): Prediction[] {
    return Object.entries(storeData).map(([raceNumber, predictData]) => ({
      playerName,
      raceNumber,
      ...predictData,
    }));
  }
}
