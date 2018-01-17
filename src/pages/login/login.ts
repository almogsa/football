import { TeamsPage } from './../teams/teams';
import { TabsPage } from './../tabs/tabs';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser() {
     this.authService.login().then((result) => {console.log('result: ',result)
     let team = localStorage.groupUser ? JSON.parse(localStorage.groupUser) : {};
     if (team && team.id) {
      this.navCtrl.push(TabsPage);
     }else {
      this.navCtrl.push(TeamsPage);
     }
   
    }).catch((error) => console.log('error to login ',error));
  }
  logoutUser() {
    localStorage.setItem('skipUser', 'false');
    localStorage.removeItem('userGroup');

    this.authService.logout();

  }
  skipLogin() {
    //this.navCtrl.push(TeamsPage);
    let team = localStorage.groupUser ? JSON.parse(localStorage.groupUser) : {};
    if (team && team.id) {
     this.navCtrl.push(TabsPage);
    }else {
     this.navCtrl.push(TeamsPage);
    }
    //store the data in the key value format
    localStorage.setItem('skipUser', 'true');

  }
}
