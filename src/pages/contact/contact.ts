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
  ionViewDidEnter() {
    console.log('ionViewDidLoad UsersPage');
    // let team = JSON.parse(localStorage.getItem('groupUser'));
    this.playaers_api.load2(null).subscribe(data=> {
      console.log('SUBSCRIBE load2' + data);
      this.players = data;
    });

  }
  goToDetails(player:any){
    this.navCtrl.push(PlayerDetailsPage, {player});
  }

}
