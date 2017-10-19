import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {PlayersApiProvider } from '../../providers/players-api/players-api';
import { PlayerDetailsPage } from "../player-details/player-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public  playaers_api : PlayersApiProvider) {

  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
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

}
