import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Unsubscribe } from '@firebase/util';
import { ref, onValue, DatabaseReference } from 'firebase/database';
import { Subject } from 'rxjs';

export interface Result {
  playerName: string;
  raceName: string;
  p10: {
    driver: number;
    points: number;
  };
  retire: {
    driver: number;
    points: number;
  };
}

export interface ResultsStored {
  [playerName: string]: PlayerResultsStored;
}

export interface PlayerResultsStored {
  [raceName: string]: {
    p10: { driver: number; points: number };
    retire: { driver: number; points: number };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private resultsRef: DatabaseReference;
  private resultsSubject: Subject<Result[]> = new Subject<Result[]>();
  private unsubscribeResultByPlayer: Unsubscribe | undefined;

  public results$ = this.resultsSubject.asObservable();

  constructor(private db: AngularFireDatabase) {
    this.resultsRef = ref(db.database, 'results');

    onValue(this.resultsRef, (snapshot) => {
      const data = snapshot.val() as ResultsStored;
      const results = this.transformResultStoreData(data);
      this.resultsSubject.next(results);
    });
  }

  getResultsByPlayer(playerName: string) {
    if (this.unsubscribeResultByPlayer) {
      this.unsubscribeResultByPlayer();
    }

    const playerResultsRef = ref(this.db.database, 'results/' + playerName);
    const subscriber = new Subject<Result[]>();
    onValue(playerResultsRef, (snapshot) => {
      const data = snapshot.val() as PlayerResultsStored;
      const results = this.transformPlayerResultStoreData(playerName, data);
      subscriber.next(results);
    });

    return subscriber.asObservable();
  }

  private transformResultStoreData(storeData: ResultsStored): Result[] {
    return Object.entries(storeData).flatMap(([playerName, data]) => {
      return this.transformPlayerResultStoreData(playerName, data);
    });
  }

  private transformPlayerResultStoreData(
    playerName: string,
    storeData: PlayerResultsStored
  ): Result[] {
    return Object.entries(storeData).map(([raceName, resultData]) => ({
      playerName,
      raceName,
      ...resultData,
    }));
  }
}
