import { PlayersApiProvider } from './../../providers/players-api/players-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlayerDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html',
})
export class PlayerDetailsPage {

  player:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams , public players_api : PlayersApiProvider) {
    this.player = {};
   // this.player = this.navParams.data;
  }

  ionViewDidLoad() {
    this.player = {};
    console.log('ionViewDidLoad PlayerDetailsPage');
    this.player = this.navParams.get('player')
    console.log('Player details: ' + JSON.stringify(this.player))
  //  this.players_api.getPlayer(player);
    
  }
  updatePlayer(player){
    console.log('Player ::: '+ JSON.stringify(player))
    this.players_api.updatePlayer(player,player);
  }
  addNewPlayer(player){
    console.log('Adding new player : '+ JSON.stringify(player))
    this.players_api.addPlayer(player);
  }
  

}
