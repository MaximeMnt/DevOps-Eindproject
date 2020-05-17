import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<any>;

  public accessToken:any ="";

  constructor(
    private afAuth:AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //this.user$ = this.afAuth.authState;

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
   }

   async setToken(idToken){
    this.accessToken = idToken;
   }

   async googleSignin(){
     const provider = new auth.GoogleAuthProvider();
     const credential = await this.afAuth.signInWithPopup(provider);
     console.log(credential.user);
     this.accessToken = credential.user.getIdTokenResult().then(function(idToken){
      localStorage.setItem('idToken', JSON.stringify(idToken)); //save to storage
      return idToken;
     });

    //  credential.user.getIdToken().then(function(idToken){
    //    //this.accessToken = idToken;
    //    const idTokentest = idToken;
    //    //this.accessToken = idTokentest;
    //    console.log("IdToken van function: " + idToken);
    //  })
     return this.updateUserData(credential.user);
   }

   private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL
    } 
    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

}
