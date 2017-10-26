import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {PlayersApiProvider } from '../../providers/players-api/players-api';
import { PlayerDetailsPage } from "../player-details/player-details";

@Component({
  selector: 'settings-home',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  admin:boolean = false;
  user:any={};
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public  playaers_api : PlayersApiProvider,public authService: AuthProvider) {

  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Reset Players',
      message: 'Are you sure you want to reset players?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.playaers_api.resetPlayers().then(x => {
              console.log('reset players successful!!! : ' + x);
         //     this.playaers_api.load2();
            })
          }
        }
      ]
    });
    confirm.present();
  }
  goToDetails(player:any){
    this.navCtrl.push(PlayerDetailsPage, {player});
  }
  isAdmin(user){
    this.authService.getAuth().then(isAdmin => {
      this.admin=isAdmin;
    })

    // if(user.name && user.name ==='admin' && user.password==='admin'){
    //   this.admin=true;
    // }
 
  }
  logOut() {
    return this.authService.logout();
  }
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
