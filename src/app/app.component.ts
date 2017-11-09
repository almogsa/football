import { PlayersApiProvider } from './../providers/players-api/players-api';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import {TeamsPage} from "../pages/teams/teams";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TeamsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth,private players_api:PlayersApiProvider) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        if (localStorage.getItem('skipUser') === 'true') {
          let team = localStorage.groupUser ? JSON.parse(localStorage.groupUser) : {};
          if (team && team.id) {
            this.rootPage = TabsPage;
          }else {
            this.rootPage = TeamsPage;
          }
        }
        else {

          this.rootPage = LoginPage;
        }
      }
      else {
        /// create a user
        this.players_api.checkIfUserExists(auth)
        .then(({authData, userExists}) => {
          if (userExists) {
            // update user
          } else {

            this.players_api.createPlayerFromGoogle(auth)
            // go create a user
          }
          //let team = JSON.parse(localStorage.getItem('groupUser') )
          let team = localStorage.groupUser ? JSON.parse(localStorage.groupUser) : {};
          if (team && team.id) {
            this.rootPage = TabsPage;
          }else {
            this.rootPage = TeamsPage;
          }

        })
        .catch(err => {
          console.warn('Error signing in.', err);
        });

      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}
