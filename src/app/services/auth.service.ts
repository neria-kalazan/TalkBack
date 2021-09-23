import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as firebaseAuth from "firebase/auth";
import {User} from "../models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  public signWithGoogle () {
    this.authLogin(new firebaseAuth.GoogleAuthProvider())
  }

  private authLogin (provider: firebaseAuth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider).then(res => {
      console.log(res);
      this.setUserData(<User> res.user);
    })
  }

  private setUserData (user?: User): Promise<void> | void {
    if (!user) return;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `user/${user.uid}`
    )

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
    }

    return userRef.set(userData, {
      merge: true
    })
  }

}
