import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NavController } from 'ionic-angular';
import { PlayersPage } from "../../pages/players/players";
import { LoginPage } from "../../pages/login/login";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user: Observable<firebase.User>
  constructor(public http: Http, public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
    //  this.user = this.afAuth.authState;

  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
      then(() => {
        console.log('Login Success');
        // this.navCtrl.push(PlayersPage); // provider can't import nav provider 
      })
      .catch(error => console.log('Login failed'));
  }
  logout() {
    this.afAuth.auth.signOut().then(x => console.log('log out'));
    //  this.navCtrl.push(LoginPage);
  }

  getAuth(): any {
    return new Promise(resolve => {
      this.afAuth.authState.take(1).subscribe(auth => {
        if (!auth)
          resolve(false);
        else
          resolve(true);
      });
    })
  }
}
