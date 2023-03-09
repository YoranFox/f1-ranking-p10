import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';

export class Player {
  name?: string;
  points: number = 0;
}

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private dbPath = '/players';

  playersRef: AngularFirestoreCollection<Player>;

  constructor(private db: AngularFirestore) {
    this.playersRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Player> {
    return this.playersRef;
  }

  create(player: Player): Promise<DocumentReference<Player>> {
    return this.playersRef.add({ ...player });
  }

  update(id: string, data: any): Promise<void> {
    return this.playersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.playersRef.doc(id).delete();
  }

  getOne(id: string) {
    return this.playersRef.ref.where('name', '==', id).get();
  }
}
