import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as firebaseAuth from "firebase/auth";
import {User} from "../models/user.interface";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDetails$: Subject<User> = new Subject<User>();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {

    const savedUserString = localStorage.getItem('user');
    if (savedUserString != null) {
      this.isLoggedIn$.next(true);
    }

    afAuth.authState.subscribe(user => {
      if (!!user) {
        this.userDetails$.next(<User>user);
        const userString: string = JSON.stringify(user);
        localStorage.setItem('user', userString);
        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('user');
        this.isLoggedIn$.next(false);
      }
    })
  }

  public signWithGoogle () {
    this.authLogin(new firebaseAuth.GoogleAuthProvider())
  }
  
  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      this.userDetails$.next(undefined);
    })
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable()
  }

  public getUserDetails(): Observable<User | undefined> {
    return this.userDetails$.asObservable()
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
