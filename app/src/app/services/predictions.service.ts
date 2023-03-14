import { Injectable } from '@angular/core';
import { Unsubscribe } from '@angular/fire/app-check';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ref, onValue, set, DatabaseReference } from 'firebase/database';
import { BehaviorSubject, Subject } from 'rxjs';

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
      const predictions = transformPredictStoreData(data);
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
    const subscriber = new BehaviorSubject<Prediction[]>([]);
    this.unsubscribePredictByPlayer = onValue(
      playerPredictionsRef,
      (snapshot) => {
        const data = snapshot.val() as PredictionsStoredPlayer;

        const predictions = transformPlayerPredictStoreData(playerName, data);
        subscriber.next(predictions);
      }
    );

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
}

export function transformPredictStoreData(
  storeData: PredictionsStored
): Prediction[] {
  if (!storeData) {
    return [];
  }
  return Object.entries(storeData).flatMap(([playerName, data]) => {
    return transformPlayerPredictStoreData(playerName, data);
  });
}

export function transformPlayerPredictStoreData(
  playerName: string,
  storeData: PredictionsStoredPlayer
): Prediction[] {
  if (!storeData) {
    return [];
  }
  return Object.entries(storeData).map(([raceNumber, predictData]) => ({
    playerName,
    raceNumber: Number(raceNumber),
    ...predictData,
  }));
}
