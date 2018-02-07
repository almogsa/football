import {Platform} from 'ionic-angular';
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

  userAuth:any;
  constructor(public http: Http, public afAuth: AngularFireAuth, public googlePlus: GooglePlus, public platform: Platform) {
    console.log('Hello AuthProvider Provider');
    this.initUserAuth();
    //  this.user = this.afAuth.authState;

  }

  login(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      this.googlePlus.login({
        'webClientId': '397610494763-eu2gbde4hreoaitdsr6bg01s7up8ehqo.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
     return   firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))

      }).catch(err => console.error("Error: ", err));
    } else {

    return  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

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


  }

  logout() {
    return this.afAuth.auth.signOut();
    //  this.navCtrl.push(LoginPage);
  }

  getAuth(): any {
    if (this.userAuth){
      return true;
    }
    else {
      return false;
    }
  }
  getUserAuth(){
    return this.userAuth;
  }
  initUserAuth() {
    this.afAuth.authState.subscribe(auth => {
      this.userAuth=auth;
    })
  }
}
