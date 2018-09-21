import { Injectable } from '@angular/core';

//AngularFire
// old import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable, Subscription } from 'rxjs';
import {map} from 'rxjs/operators';

import { User } from '../../models/user/user';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
	//list variables
	usersCollectionRef: AngularFirestoreCollection<User>;
  usersCollection: Observable<User[]>;
  
	//object variables
	userDocumentRef: AngularFirestoreDocument<User>;
  userDocument: Observable<User>;
  userObjSubscription:Subscription;
  constructor(private afDb: AngularFirestore) {
    this.usersCollectionRef = this.afDb.collection('users');
   }

   getRegisteredStudents(){
    this.usersCollectionRef = this.afDb.collection('users', ref => 
      ref.where('user_type', '==', 'student'));
      this.usersCollection = this.usersCollectionRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      return this.usersCollection;
   }
}
