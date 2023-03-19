import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Unsubscribe } from '@firebase/util';
import {
  ref,
  set,
  get,
  child,
  onValue,
  update,
  DatabaseReference,
} from 'firebase/database';
import { BehaviorSubject } from 'rxjs';
import { getNextRaceNumber, getRace } from '../data/schedule';
import { PlayersService } from './players.service';
import {
  PredictionsStored,
  transformPredictStoreData,
} from './predictions.service';

export interface Result {
  playerName: string;
  raceNumber: number;
  p10: {
    driver: number;
    points: number;
  };
  retire: {
    driver: number;
    points: number;
  };
}

export interface RaceResultsStored {
  [playerName: string]: {
    p10: { driver: number; points: number };
    retire: { driver: number; points: number };
  };
}

export interface ResultsStored {
  [raceNumber: number]: RaceResultsStored;
}

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private resultsRef: DatabaseReference;
  private lastResultsRef: DatabaseReference;
  private resultsSubject: BehaviorSubject<Result[]> = new BehaviorSubject<
    Result[]
  >([]);
  private unsubscribeResultByPlayer: Unsubscribe | undefined;

  private resultLastUpdated: Date | undefined;

  public results$ = this.resultsSubject.asObservable();

  constructor(
    private db: AngularFireDatabase,
    private playerService: PlayersService
  ) {
    this.resultsRef = ref(db.database, 'results');
    this.lastResultsRef = ref(this.db.database, 'result-last-updated');

    onValue(this.resultsRef, (snapshot) => {
      const data = snapshot.val() as ResultsStored;
      const results = this.transformResultStoreData(data);
      this.resultsSubject.next(results);
    });

    onValue(ref(this.db.database, 'result-last-updated'), (snapshot) => {
      const data = snapshot.val();
      this.resultLastUpdated = new Date(Number(data));
    });
    setInterval(() => {
      this.calculateResults();
    }, 10 * 1000);
  }

  getResultsByPlayer(playerName: string) {}

  private transformResultStoreData(storeData: ResultsStored): Result[] {
    return Object.entries(storeData).flatMap(([raceNumber, data]) => {
      return this.transformPlayerResultStoreData(Number(raceNumber), data);
    });
  }

  private transformPlayerResultStoreData(
    raceNumber: number,
    storeData: RaceResultsStored
  ): Result[] {
    return Object.entries(storeData).map(([playerName, resultData]) => ({
      playerName,
      raceNumber,
      ...resultData,
    }));
  }

  // Gotta make sure this one doesnt mess up when multiple people do this :(
  calculateResults() {
    if (!this.resultLastUpdated) {
      return;
    }

    const nextRaceNumber = getNextRaceNumber();

    const nextRace = getRace(nextRaceNumber);

    // only update when its race day
    if (new Date(nextRace.Date) > new Date()) {
      return;
    }

    // We only update once so many minutes
    const nextUdpate = this.resultLastUpdated.valueOf() + 5 * 60000;
    if (new Date(nextUdpate) > new Date()) {
      return;
    }

    // If there already are results of the race we return
    if (
      this.resultsSubject.value.some(
        (result) => result.raceNumber === nextRaceNumber
      )
    ) {
      return;
    }

    set(this.lastResultsRef, new Date().valueOf());

    get(child(ref(this.db.database), `predictions`)).then((snapshot) => {
      const data = snapshot.val() as PredictionsStored;
      const predictions = transformPredictStoreData(data);
      const racePredictions = predictions.filter(
        (prediction) => prediction.raceNumber === nextRaceNumber
      );

      const url = `https://ergast.com/api/f1/current/${nextRaceNumber}/results.json`;

      fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.text())
        .then((response) => {
          const raceResult: any[] =
            JSON.parse(response).MRData.RaceTable.Races[0].Results;

          if (!raceResult) {
            return;
          }
          let firsRetire: { number: number } | null = null;
          const retiredDrivers = raceResult.filter(
            (r) => r.positionText === 'R'
          );
          if (retiredDrivers.length > 0) {
            firsRetire = retiredDrivers[retiredDrivers.length - 1];
          }

          const results: Result[] = [];
          racePredictions.forEach((prediction) => {
            const correctFirstRetire = prediction.retire === firsRetire?.number;

            const p10Driver = raceResult.find(
              (r) => r.number === prediction.p10
            );
            const delta10 = Math.abs(Number(p10Driver.position) - 10);

            const result: Result = {
              playerName: prediction.playerName,
              raceNumber: nextRaceNumber,
              p10: {
                driver: prediction.p10,
                points: points[delta10],
              },
              retire: {
                driver: prediction.retire,
                points: correctFirstRetire ? 10 : 0,
              },
            };
            results.push(result);
          });
          this.createResults(results);
        });
    });
  }

  createResults(results: Result[]) {
    const data: RaceResultsStored = {};

    const updates: any = {};
    results.forEach((result) => {
      data[result.playerName] = {
        p10: result.p10,
        retire: result.retire,
      };
    });

    updates[`results/${results[0].raceNumber.toString()}`] = data;

    this.playerService.players$.subscribe((value) => {
      results.forEach((result) => {
        const player = value.find((v) => v.name === result.playerName);
        if (!player) {
          return;
        }
        updates[`players/${player.name}`] = {
          points: player.points + result.p10.points + result.retire.points,
        };
      });
    });

    update(ref(this.db.database), updates);
  }

  test() {
    const nextRaceNumber = 1;
    get(child(ref(this.db.database), `predictions`)).then((snapshot) => {
      const data = snapshot.val() as PredictionsStored;
      const predictions = transformPredictStoreData(data);
      const racePredictions = predictions.filter(
        (prediction) => prediction.raceNumber === nextRaceNumber
      );

      const url = `https://ergast.com/api/f1/current/${nextRaceNumber}/results.json`;

      fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.text())
        .then((response) => {
          const raceResult: any[] =
            JSON.parse(response).MRData.RaceTable.Races[0].Results;
          let firsRetire: { number: number } | null = null;
          const retiredDrivers = raceResult.filter(
            (r) => r.positionText === 'R'
          );
          if (retiredDrivers.length > 0) {
            firsRetire = retiredDrivers[retiredDrivers.length - 1];
          }

          const results: Result[] = [];
          racePredictions.forEach((prediction) => {
            const correctFirstRetire = prediction.retire === firsRetire?.number;

            console.log(raceResult, prediction);

            const p10Driver = raceResult.find(
              (r) => Number(r.number) === prediction.p10
            );
            const delta10 = Math.abs(Number(p10Driver.position) - 10);

            const result: Result = {
              playerName: prediction.playerName,
              raceNumber: nextRaceNumber,
              p10: {
                driver: prediction.p10,
                points: points[delta10],
              },
              retire: {
                driver: prediction.retire,
                points: correctFirstRetire ? 10 : 0,
              },
            };
            results.push(result);
          });
          this.createResults(results);
        });
    });
  }
}

export const points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 1, 1];
