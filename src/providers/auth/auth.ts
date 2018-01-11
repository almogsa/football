import {NavController, Platform} from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import {PlayersPage} from '../../pages/players/players';

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class AuthProvider {

  constructor(public http: Http, public afAuth: AngularFireAuth, public googlePlus: GooglePlus, public platform: Platform,public navCtrl: NavController) {
    console.log('Hello AuthProvider Provider');
    //  this.user = this.afAuth.authState;

  }

  login(): void {
    if (this.platform.is('cordova')) {
      this.googlePlus.login({
        'webClientId': '397610494763-eu2gbde4hreoaitdsr6bg01s7up8ehqo.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
          })
          .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
      }).catch(err => console.error("Error: ", err));
    } else {

      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        console.log('Login Success');
        this.navCtrl.push(PlayersPage);
      })
        .catch(error => console.log('Login failed'));
    }
  }

  login2() {

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    firebase.auth().getRedirectResult().then(function (authData) {
      this.navCtrl.push(PlayersPage);
      console.log('Login Success');
    }).catch(function (error) {
      console.log(error);
    });

    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
    //   then(() => {
    //     console.log('Login Success');
    //     // this.navCtrl.push(PlayersPage); // provider can't import nav provider
    //   })
    //   .catch(error => console.log('Login failed'));
  }

  logout() {
    return this.afAuth.auth.signOut();
    //  this.navCtrl.push(LoginPage);
  }

  checkPlayerExists(){

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
