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
    return this.authService.login();
  }
  logoutUser() {
    localStorage.setItem('skipUser', 'false');
    
    this.authService.logout();
   

    
  }
  skipLogin() {
    this.navCtrl.push(TabsPage);

    //store the data in the key value format
    localStorage.setItem('skipUser', 'true');
  }
}