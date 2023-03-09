import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';

export class Prediction {
  raceName?: string;
  p10?: number;
  retirement?: number;
  userId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  private dbPath = '/predictions';

  predictionsRef: AngularFirestoreCollection<Prediction>;

  constructor(private db: AngularFirestore) {
    this.predictionsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Prediction> {
    return this.predictionsRef;
  }

  getRacePredictions(raceName: string) {
    return this.predictionsRef.ref.where('raceName', '==', raceName);
  }

  async userRacePrediction(raceName: string, userId: string) {
    console.log(raceName, userId);

    return this.predictionsRef.ref
      .where('raceName', '==', raceName)
      .where('userId', '==', userId)
      .get()
      .then((qs) => {
        if (qs.empty) {
          return null;
        } else {
          return qs.docs[0].data();
        }
      });
  }

  create(prediction: Prediction): Promise<DocumentReference<Prediction>> {
    return this.predictionsRef.add({ ...prediction });
  }

  update(id: string, data: any): Promise<void> {
    return this.predictionsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.predictionsRef.doc(id).delete();
  }
}
