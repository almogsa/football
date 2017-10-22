import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

const teamID = 'teams-data/3dd50aaf-6b03-4497-b074-d81703f07ee8';
const baseURL = teamID+'/players/';
/*
  Generated class for the PlayersApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// declare var firebase;
@Injectable()
export class PlayersApiProvider {

  
  data:any;
  players: FirebaseListObservable<any[]>;
  loader:any;
  
  constructor(public http: Http,public firebase : AngularFireDatabase,public loadingCtrl: LoadingController) {
    console.log('Hello PlayersApiProvider Provider');
   
    // this._db = firebase.database().ref('/'); // Get a firebase reference to the root this._todosRef = firebase.database().ref('todos'); // Get a firebase reference to the todos
    // console.log('DB : '+ this._db);
    // this._playersRef = firebase.database().ref('teams-data/3dd50aaf-6b03-4497-b074-d81703f07ee8'); // Get a firebase reference to the todos
    // console.log('DB2 : '+ this._playersRef);
    // this._playersRef.on('child_added', this.handleData, this); // ***ADD THIS LINE***
     firebase.list(baseURL).subscribe(data=>{
      this.data=data;
    });
    this.loadPlayers();
   
   
    
    
  }
  handleData(){
    console.log('handle data');
  }

  updatePlayer(player: any,config : any): void {
    
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
    this.firebase.object(baseURL + player.$key).update(config).then(x => {
      this.loader.dismiss();
      console.log(' player updated: ' + x);});
    

  }
  addPlayer(player) {
    player.index=0;
    player.admin = false;
    player.arrive = false;
    let dbRef =  this.firebase.database.ref(baseURL);
  //   let key = dbRef.push();
    this.getLastFromList(dbRef,function(last){
      dbRef.child(last).set(player);
    })
    
  }
   getLastFromList(ref, cb) {
    ref.limitToLast(1).once("child_added", function (snapshot) {
      cb(Number.parseInt(snapshot.key) + 1);
    });
  }
  resetPlayers(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
    let playersRef = this.firebase.database.ref(baseURL);
    //  playersRef.on('child_changed', function (snap) {
    //    console.log('****CHILD CHANGED***');
    //   });
   return new Promise((resolve,reject) => {  
    this.loadPlayers().then(players => {
      this.data = players;
      console.log('starting to reset players' +  players);
      let field = 'arrive';
      let value = false;
      let players2Update =  this.bulkUpdate(players,field,value);
         this.firebase.database.ref().update(players2Update).then(x => {
          this.loader.dismiss();
          console.log('finish reset players');
          resolve(this.data);
       });
    }).catch(error =>{
      reject("Error loading players " + error.code);
    })

  //    playersRef.once("value", snapshot => {
  //     this.data = snapshot.val();
  //     console.log(snapshot.val());
  //     let field = 'arrive';
  //     let value = false;
  //     let players2Update =  this.bulkUpdate(this.data,field,value);
  //        this.firebase.database.ref().update(players2Update).then(x => {
  //         this.loader.dismiss();
  //         console.log('finish reset players');
  //         resolve(this.data);
  //      });
  //  }, function (error) {
  //     console.log("Error loading players " + error.code);
  //     reject("Error loading players " + error.code);
      
  //  });
  });

   //this.firebase.list(baseURL)

    
 
  }
  getPlayer(player: any): any {
    new Promise(resolve => {
     let player2 = this.firebase.object(baseURL +  player.$key).subscribe(data=>{
        console.log('P' + data);
        console.log('P' + data);
        resolve(player2);
      });
     });
   }

  load2(){
    
          return this.firebase.list(baseURL);
          
          }

  loadPlayers():Promise<any>{
    

          //  if(this.data){
          //      return Promise.resolve(this.data);
          //  }
          return new Promise((resolve,reject) => {
            let ref = this.firebase.database.ref(baseURL);
            ref.once('value', snapshot => {
                this.data=snapshot.val();
                resolve(this.data);
              }).catch(error => {
                reject('failed to get data from firebase' + error);
              });
            })
           };
           getShoppingItems() {
            return this.firebase.list('baseURL');
          }
         
          addItem(name) {
            this.firebase.list(baseURL).push(name);
          }
         
          removeItem(id) {
            this.firebase.list(baseURL).remove(id);
          }
          bulkUpdate(ref, field , value) {
            // object to hold the bulk update
            var batch = {};
            // Using a ES6 promise here, use a library or polyfil for compatibility
            // using Object.keys will allow us to iterate over an array or object
            Object.keys(ref).forEach(function(r) {
              // get the push id from the child reference, no server trip is made here
              var pushId = baseURL+r+'/'+field;
              // get the value from the collection
              var itemValue = value;
              // using the pushId, assign the value to the bulk update object
              batch[pushId] = itemValue;
            });
            return batch;
            
          }
          
    
       

}
