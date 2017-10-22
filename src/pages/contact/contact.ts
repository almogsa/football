import { PlayerDetailsPage } from './../player-details/player-details';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlayersApiProvider } from '../../providers/players-api/players-api';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
players:any;
  constructor(public navCtrl: NavController ,public  playaers_api : PlayersApiProvider ) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
     this.playaers_api.loadPlayers().then((res) => { 
       this.players = res;
       console.log('response contacts' + res );
      
       });
    //this.line();
  }
  goToDetails(player:any){
    this.navCtrl.push(PlayerDetailsPage, {player});
  }

}
