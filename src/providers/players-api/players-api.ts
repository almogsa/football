
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import {App} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database'
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/take';
import { LoginPage } from "../../pages/login/login";

const teamID = 'teams-data/3dd50aaf-6b03-4497-b074-d81703f07ee8';
const baseURL2 = 'teams-data';
const baseURL = teamID + '/players/';

/*
  Generated class for the PlayersApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// declare var firebase;
@Injectable()
export class PlayersApiProvider {


  data: any[];
  players: FirebaseListObservable<any[]>;
  loader: any;
  db_list: FirebaseListObservable<any[]>  // list return an array of values
  db_listTeams: FirebaseListObservable<any[]>  // list return an array of values

  db_object: FirebaseObjectObservable<any>;

  constructor(public http: Http, public firebase: AngularFireDatabase, public loadingCtrl: LoadingController, public events: Events,public app: App) {
    console.log('Hello PlayersApiProvider Provider');
    this.db_list = firebase.list(baseURL);  // list return an array of values
    this.db_listTeams = firebase.list('teams');  // list return an array of values
    this.db_object = firebase.object(baseURL + '/key');
    

   /* firebase.list(baseURL).subscribe(data => {
      this.data = data;
    });*/
   // this.loadPlayers();




  }
  handleData() {
    console.log('handle data');
  }
  checkIfUserExists(authData) {
    return this.firebase.database.ref(`${baseURL2}/${this.getCurrentTeam().id}/players`)
      .child(authData.uid)
      .once('value')
      .then(dataSnapshot => {
        return Promise.resolve({
          authData,
          userExists: dataSnapshot.exists(),
        });
      });
  }

  updatePlayer(player: any, config: any): Promise<any> {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
    //this.db_list.update(player.$key,player); update by list
    return new Promise(resolve => {
      let base = `${baseURL2}/${this.getCurrentTeam().id}/players/`;
      this.firebase.object(base + (player.$key || player.key)).update(config).then(x => {
        this.loader.dismiss();
        this.events.publish('player:updated', player, Date.now());
        console.log(' player updated: ' + x);
        resolve(player);
      })
      .catch(x => console.log('error when updating user'));
    });
  }
  getTeamsData(): Promise<any> {
    //  if(this.data){
    //      return Promise.resolve(this.data);
    //  }
    return new Promise((resolve, reject) => {
      this.db_listTeams.take(1).subscribe(teams => {
        resolve(teams);
        console.log('teams:', teams);

      })
    })
  }
  removePlayer(player: any): void {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
    //this.firebase.list(baseURL).remove(id);
    let base = `${baseURL2}/${this.getCurrentTeam().id}/players/`;
    this.firebase.object(base + (player.$key || player.key)).remove().then(x => {
      this.loader.dismiss();
      localStorage.setItem('skipUser', 'false');
      this.app.getActiveNav().setRoot(LoginPage); // can't  inject NavController in provider
      console.log(' player deleted: ' + x);
    });
  }


  createPlayerFromGoogle(auth) {
    let player = {
      uid: auth.uid,
      admin: false,
      arrive: false,
      index: 0,
      strength:50,
      name: auth.displayName,
      email: auth.email,
      img: auth.providerData[0].photoURL,
      phone: auth.phoneNumber

    }
    let base = `${baseURL2}/${this.getCurrentTeam().id}/players`;
    this.firebase.object(`${base}/${player.uid}`).set(player);
  }
  addPlayer(player): Promise<any> {
    player.index = 0;
    player.admin = false;
    player.arrive = false;
    let base = `${baseURL2}/${this.getCurrentTeam().id}/players`;
    let dbRef = this.firebase.database.ref(base);
    return new Promise(resolve =>{
  
    let key = dbRef.push().then(x => {
     
      player.uid= x.key;
    
        this.firebase.object(`${base}/${player.uid}`).set(player).then(data => {
          resolve();
        })
      })
  
    })
   
   
    
  
     
   
    // this.getLastFromList(dbRef, (last) => {
    //   this.db_list.update(last.toString(), player);

    // })

  }



  getLastFromList(ref, cb) {
    ref.limitToLast(1).once("child_added", function (snapshot) {
      cb(Number.parseInt(snapshot.key) + 1);
    });
  }
  resetPlayers() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
    // let playersRef = this.firebase.database.ref(baseURL);
    //  playersRef.on('child_changed', function (snap) {
    //    console.log('****CHILD CHANGED***');
    //   });
    return new Promise((resolve, reject) => {
      this.loadPlayers().then(players => {
        this.data = players;
        console.log('starting to reset players' + players);
        let field = 'arrive';
        let value = false;
        let players2Update = this.bulkUpdate(players, field, value,this.getCurrentTeam().id);
        this.firebase.database.ref().update(players2Update).then(x => {
          this.loader.dismiss();
          console.log('finish reset players');
          resolve(this.data);
        });
      }).catch(error => {
        reject("Error loading players " + error.code);
      })

    });

  }
  getPlayer(player: any): any {
    new Promise(resolve => {
      let base = `${baseURL2}/${this.getCurrentTeam().id}/players/`;
      let player2 = this.firebase.object(base + (player.$key || player.key)).take(1).subscribe(data => {
        resolve(player2);
      });
    });
  }

  load2(teamd) {
    let base = `${baseURL2}/${this.getCurrentTeam().id}/players`;
    return this.firebase.list(base);

  }

  loadPlayers(): Promise<any> {
    //  if(this.data){
    //      return Promise.resolve(this.data);
    //  }
    let base = `${baseURL2}/${this.getCurrentTeam().id}/players`;
    return new Promise((resolve, reject) => {
      this.firebase.list(base).take(1).subscribe(players => {
     //   this.db_list.take(1).subscribe(players => {
        resolve(players);
        this.data = players;
        console.log('players:', players);

      })
    })
  }
  // loadPlayers2(): Promise<any> {


  //   //  if(this.data){
  //   //      return Promise.resolve(this.data);
  //   //  }
  //   return new Promise((resolve, reject) => {

  //     let ref = this.firebase.database.ref(baseURL);
  //     ref.once('value', snapshot => {
  //       let arr = Object.entries(snapshot.val()).map(e => Object.assign(e[1], { key: e[0] }));

  //       resolve(arr);
  //     }).catch(error => {
  //       reject('failed to get data from firebase' + error);
  //     });
  //   })
  // };

  getCurrentTeam(){
    let team = JSON.parse(localStorage.getItem('groupUser'));
    return team;
  }
  getShoppingItems() {
    return this.firebase.list(baseURL);
  }

  addItem(name) {
    this.firebase.list(baseURL).push(name);
  }

  removeItem(id) {
    this.firebase.list(baseURL).remove(id);
  }
  bulkUpdate(ref, field, value,teamId) {
    // object to hold the bulk update
    var batch = {};
    // Using a ES6 promise here, use a library or polyfil for compatibility
    // using Object.keys will allow us to iterate over an array or object
   ref.forEach(function (r) {
      // get the push id from the child reference, no server trip is made here
     
     let base = `${baseURL2}/${teamId}/players/`;
      var pushId = base + r.$key + '/' + field;
      // using the pushId, assign the value to the bulk update object
      batch[pushId] = value;
    });
    return batch;

  }




}
