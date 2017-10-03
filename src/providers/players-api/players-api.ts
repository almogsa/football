import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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
  private _db: any;
  private _playersRef: any;
  constructor(public http: Http,public firebase : AngularFireDatabase) {
    console.log('Hello PlayersApiProvider Provider');
    debugger;
    // this._db = firebase.database().ref('/'); // Get a firebase reference to the root this._todosRef = firebase.database().ref('todos'); // Get a firebase reference to the todos
    // console.log('DB : '+ this._db);
    // this._playersRef = firebase.database().ref('teams-data/3dd50aaf-6b03-4497-b074-d81703f07ee8'); // Get a firebase reference to the todos
    // console.log('DB2 : '+ this._playersRef);
    // this._playersRef.on('child_added', this.handleData, this); // ***ADD THIS LINE***
     firebase.list(baseURL).subscribe(data=>{
      this.data=data;
    });
    this.load();
   
   
    
    
  }
  handleData(){
    console.log('handle data');
  }

  updatePlayer(player: any,config : any): void {
    // let player2 = this.firebase.object(baseURL +  player.$key).subscribe(data=>{
    //   console.log('P' + data);
    //   console.log('P' + data);
      
    // });
    
    this.firebase.object(baseURL + player.$key).update(config);
    console.log('updated');

  }
  resetPlayers(){
    let playersRef = this.firebase.database.ref(teamID).child('players');
   
   // let playersRef = this.firebase.list(baseURL);
    // playersRef.on('child_changed', function (snap) {
    //   console.log('****CHILD CHANGED***');
    //  });

     let obj2Update = {'arrive':false};
     let objects2 =  this.bulkUpdate(this.data,obj2Update);
     //playersRef.update(objects2);
     let v =  this.firebase.database.ref().update(objects2);
    //this.firebase.object(baseURL).update(objects2); 
    
    
    //this.firebase.object(baseURL).update({arrive: false});
  }
  // getPlayer(player: any): any {
  //   new Promise(resolve => {
  //    let player2 = this.firebase.object(baseURL +  player.$key).subscribe(data=>{
  //      console.log('P' + data);
  //      console.log('P' + data);
  //      resolve(player2);
  //    });
  //   });
  // }
  load(){
    

       //    if(this.data){
       //        return Promise.resolve(this.data);
       //    }
    
           return new Promise(resolve => {
          
           this.data = this.firebase.list(baseURL).subscribe(data=>{
            this.data=data;
            
            resolve(this.data);
          });
            
              //  this.http.get('https://football-wednesday.firebaseio.com/teams-data.json').map(response => response.json())
              //  .subscribe((data) => {
              //       this.data = data;
              //       let players = data["3dd50aaf-6b03-4497-b074-d81703f07ee8"].players;
              //       resolve(players);
              //   });
  
              //     resolve(this.data);
    
               });
    
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
          bulkUpdate(ref, obj) {
            // object to hold the bulk update
            var batch = {};
            // Using a ES6 promise here, use a library or polyfil for compatibility
            // using Object.keys will allow us to iterate over an array or object
            Object.keys(ref).forEach(function(r) {
              // get the push id from the child reference, no server trip is made here
              var pushId = baseURL+r+'/arrive';
              // get the value from the collection
              var itemValue = false;
              // using the pushId, assign the value to the bulk update object
              batch[pushId] = itemValue;
            });
            return batch;
            
          }
          
    
       

}
