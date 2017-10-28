import { TabsPage } from './../pages/tabs/tabs';
import { AuthProvider } from './../providers/auth/auth';
import { LoginPage } from './../pages/login/login';
import { PlayersPage } from './../pages/players/players';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      console.log('Auth',auth);
      if (!auth) {
        if (localStorage.getItem('skipUser') === 'true') {
          this.rootPage = TabsPage;
        }
        else {
          this.rootPage = LoginPage;
        }
      }
      else
        this.rootPage = TabsPage;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}
