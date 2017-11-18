import { TeamsPage } from './../teams/teams';
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
  ionViewDidEnter(){
    console.log('settings did enter')
    this.isAdmin();
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
  isAdmin(){
    this.authService.getAuth().then(isAdmin => {
      this.admin=isAdmin;
    })

    // if(user.name && user.name ==='admin' && user.password==='admin'){
    //   this.admin=true;
    // }
 
  }
  logOut() {
    localStorage.setItem('skipUser', 'false');
    
    this.authService.logout().then(x => console.log('log out from settings page'));
  }
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  changeTeam(){
    localStorage.removeItem('groupUser');
    this.navCtrl.push(TeamsPage);
   
  }

}
