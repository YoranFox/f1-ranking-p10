import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ref, set, onValue, DatabaseReference } from 'firebase/database';
import { BehaviorSubject, Subject } from 'rxjs';
import { ResultsService } from './results.service';

export interface Player {
  points: number;
  name: string;
}

export interface PlayerStored {
  [name: string]: { points: number };
}

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private playersRef: DatabaseReference;
  private playersSubject: BehaviorSubject<Player[]> = new BehaviorSubject<
    Player[]
  >([]);

  public players$ = this.playersSubject.asObservable();
  public me!: string;

  constructor(private db: AngularFireDatabase, private router: Router) {
    this.playersRef = ref(db.database, 'players');
    onValue(this.playersRef, (snapshot) => {
      const data = snapshot.val() as PlayerStored;
      let players = Object.entries(data).map(([name, data]) => {
        return {
          name,
          ...data,
        };
      });
      if (me && !players.some((player) => player.name === me)) {
        localStorage.removeItem('me');
        router.navigate(['login']);
      }

      players = players.sort((a, b) => b.points - a.points);
      this.playersSubject.next(players);
    });

    const me = localStorage.getItem('me');
    if (!me) {
      router.navigate(['login']);
      return;
    }
    this.me = me;
  }

  async create(playerName: string) {
    if (playerName === '' || playerName === null) {
      return null;
    }
    return set(ref(this.db.database, 'players/' + playerName), {
      points: 0,
    });
  }

  setMe(playerName: string) {
    localStorage.setItem('me', playerName);
    this.me = playerName;
  }
}
