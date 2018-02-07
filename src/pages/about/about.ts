import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlayersApiProvider } from '../../providers/players-api/players-api';
import { PlayerDetailsPage } from "../player-details/player-details";
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  users: any[];
  originalUsers:any[];
 // players=[{"_id":"5847a1b0d1bcdd000427952a","arrive":false,"name":"יוסי","number":83,"strength":10,"__v":0,"index":0},{"_id":"5925640914729300048b038441","arrive":true,"name":"חבר-22","number":0,"strength":4,"__v":0,"index":0},{"_id":"5925640914729300048b0381","arrive":false,"name":"חבר-1","number":0,"strength":1,"__v":0,"index":0},{"_id":"5847a177d1bcdd0004279526","arrive":false,"name":"דרור","number":12,"strength":3,"__v":0,"index":0},{"_id":"5847a1a2d1bcdd0004279529","arrive":true,"name":"אבי","number":3,"strength":5,"__v":0,"index":0},{"_id":"592563e514729300048b0380","arrive":true,"name":"יואל","number":4.5,"strength":1,"__v":0,"index":1},{"_id":"5847a109d1bcdd0004279522","arrive":true,"name":"ירון","number":11,"strength":6,"__v":0,"index":1},{"_id":"5846f55f8675290004db6ea6","arrive":true,"name":"חזי","number":2,"strength":5.5,"__v":0,"index":1},{"_id":"5847a1c5d1bcdd000427952b","arrive":true,"name":"רן","number":5,"strength":6.2,"__v":0,"index":2},{"_id":"5847a18ad1bcdd0004279527","arrive":true,"name":"בני","number":4,"strength":5,"__v":0,"index":3},{"_id":"5847a162d1bcdd0004279524","arrive":true,"name":"אלון קורן","number":7,"strength":7,"__v":0,"index":4},{"_id":"5847a152d1bcdd0004279523","arrive":true,"name":"אלון ברלין","number":10,"strength":8,"__v":0,"index":5},{"_id":"5847a195d1bcdd0004279528","arrive":true,"name":"קובי","number":8,"strength":5,"__v":0,"index":6},{"_id":"5847a105d1bcdd0004279521","arrive":true,"name":"דובי","number":12,"strength":7,"__v":0,"index":7},{"_id":"5842c0cfd0cb15000453689e","arrive":true,"name":"אייל","number":99,"strength":6.5,"remark":"","phone":"55555","__v":0,"index":8},{"_id":"5847a16ed1bcdd0004279525","arrive":true,"name":"טל","number":12,"strength":4,"__v":0,"index":9},{"_id":"584325a10d5daa00041c0ca2","arrive":true,"name":"אלמוג","number":9,"strength":5.2,"phone":"0545597072","__v":0,"index":10}]
 players:any;
  allTeams = [];
  arrivedPlayers=[];
  penddingdPlayers=[];
  default_img = '../assets/empty_profile.png'
  constructor(public navCtrl: NavController,public playaers_api: PlayersApiProvider,public events: Events) {
    // let playersRef = this.firebase.database.ref(baseURL);
    // playersRef.on('child_changed', function (snap) {
    //   console.log('****CHILD CHANGED***');
    //  });
    events.subscribe('player:updated', (player, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('player:updated * * ', player, 'at', time);
   //   this.ionViewDidEnter();
    });

  }
  ionViewDidLoad() { // like ngOninit
    console.log('ionViewDidLoad UsersPage');
/*    this.playaers_api.loadPlayers().then(data=>{
      console.log('Line Page get players load2' + data);
      this.players=data;
      this.line();
    })*/

    this.playaers_api.load2(null).subscribe(data=>{
      console.log('SUBSCRIBE load2' + data);
      this.players=data;


    })
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter UsersPage');
    this.line();
/*    this.playaers_api.loadPlayers().then(data=>{
      console.log('Line Page get players load2' + data);
      this.players=data;
      this.line();
    })*/
  }
  goToDetails(player:any){
    this.navCtrl.push(PlayerDetailsPage, {player});
  }
  refreshLine(){
    this.line();
  }
  line(){

    this.arrivedPlayers =  this.players.filter(function(player){ return player.arrive === true});
    if (this.arrivedPlayers.length < 8){
      return;
    }
    this.penddingdPlayers = this.players.filter(function(player){ return player.arrive === false});
    let  sortedPlayer = Object.assign([],this.arrivedPlayers.sort( (a,b) =>  b.strength - a.strength)) ;
    let sortedPlayerDesc =  this.arrivedPlayers.sort( (a,b) => a.strength - b.strength);
    let total = this.arrivedPlayers.length;
    console.log('total : ' + total);
    let players_in_group =  4; // number of players in each team
    let remainder = total % players_in_group;
    let missingPlayers = players_in_group - remainder;

    let teams = (total - remainder) / players_in_group;
    console.log('teams : ' + teams);
    let hasRemainder = false;
    let that = this;
  let missingPlayersArray = [];
    if (remainder != 0) {
      if(missingPlayers > 0){
        for (let i = 0; i < missingPlayers; i++) {
          let player =  JSON.parse(JSON.stringify(sortedPlayer[i]));
          player.name = 'miss'+i;
        /*  if (missingPlayers === teams){
            player.strength = that.getAverageStrength(this.arrivedPlayers,teams,0);
          }*/
          player.strength = this.getAverageStrength(this.arrivedPlayers,teams,0);
          missingPlayersArray.push(player);
         // sortedPlayer.push(player);
         // sortedPlayerDesc.push(player);
        }
      }
        teams++;
       // hasRemainder = true;
    }
    sortedPlayer =  Object.assign([],this.arrivedPlayers.sort( (a,b) =>  b.strength - a.strength)) ;
    sortedPlayerDesc =  Object.assign([],this.arrivedPlayers.sort( (a,b) =>  a.strength - b.strength)) ;
    let  teamA = [];
    let  teamB = [];
    let  teamC = [];
    let  teamD = [];
    let  teamE = [];
    let  teamF = [];
    let lastteam = 0;
    let iterations = 1;
    this.allTeams = [teamA,teamB,teamC,teamD,teamE,teamF];
    this.allTeams = this.allTeams.slice(0, -(this.allTeams.length - teams));

    for(let _i=0; _i < this.arrivedPlayers.length; _i++){
      if (iterations % 2 === 0 ){
        let player =this.getRandomPlayerWithSameStrength(sortedPlayerDesc,sortedPlayer);
        that.getTeamtoAddPlayer(that.allTeams, iterations, hasRemainder, players_in_group,lastteam).push(player);
        //sortedPlayerDesc.splice(0,1)
      } else {
        let player =this.getRandomPlayerWithSameStrength(sortedPlayer,sortedPlayerDesc);
        that.getTeamtoAddPlayer(that.allTeams, iterations, hasRemainder, players_in_group,lastteam).push(player);
//        sortedPlayer.splice(0,1)

      }
      lastteam++;
      if (lastteam > teams - 1) {
        lastteam = 0;
        iterations++;
        that.allTeams =  that.allTeams.sort((a,b) => a.eq - b.eq );
      }
      that.eqAll(that.allTeams);

    }
    for(let _i=0; _i < missingPlayersArray.length; _i++){
      that.getTeamtoAddPlayer(that.allTeams, iterations, hasRemainder, players_in_group,lastteam).push(missingPlayersArray[_i]);
      lastteam++;
      if (lastteam > teams - 1) {
        lastteam = 0;
        iterations++;
        that.allTeams =  that.allTeams.sort((a,b) => a.eq - b.eq );
      }
    }
    /*sortedPlayer.forEach(function (value, key) {
        that.getTeamtoAddPlayer(that.allTeams, iterations, hasRemainder, players_in_group,lastteam).push(value);
        lastteam++;
        if (lastteam > teams - 1) {
          lastteam = 0;
          iterations++;
          that.allTeams =  that.allTeams.sort((a,b) => a.eq - b.eq );
      }
      console.log('team A : ' + teamA.length);
      console.log('team B : ' + teamB.length);
      console.log('team C : ' + teamC.length);
      console.log('team D : ' + teamD.length);
      console.log('team E : ' + teamE.length);
      console.log('last team: ' +lastteam);
      that.eqAll(that.allTeams);
      // console.log('eq A: ' + teamA.eq);
      // console.log('eq B: ' + teamB.eq);
      // console.log('eq C: ' + teamC.eq);
      // console.log('eq D: ' + teamD.eq);

    })*/


    console.log(JSON.stringify(sortedPlayer));
    console.log('arrived players: ' +  sortedPlayer.length);
 //   that.teamPower(this.players);

  }
  getRandomPlayerWithSameStrength(players,players2){
    let strength = players[0].strength;
    let player;
    let num = players.filter(a => a.strength === strength).length;
    if (num > 1 ){
      let random = Math.floor(Math.random() * num);
      player =  players[random];
      players.splice(random,1);
      players2.splice(players2.findIndex(x => x.name === player.name),1);
    } else {
      player=players[0];
      players2.splice(players2.findIndex(x => x.name === player.name),1);
      players.splice(0,1);

    }
    return player;



  }
  getAverageStrength(players,teamNumber,iteration){
    players = players.sort((a,b) => b.strength - a.strength);
    let strength = players.map(player => player.strength).slice(iteration*teamNumber,(iteration+1)* teamNumber).reduce((accumulator , currentValue) => accumulator + currentValue) / teamNumber;
    //let strength = players.map(player => player.strength).slice(iteration*teamNumber,1)
    console.log('strength** ' + strength);
    return strength;
  }
  getTeamtoAddPlayer(index, iterations, hasRemainder, players_in_group,lastteam) {

    let _allTeams = this.allTeams;
    // if ((iterations == players_in_group) && hasRemainder) {
    //   _allTeams = this.allTeams.sort(this.dynamicSort('-eq'));

    //     return _allTeams[lastteam];
    // }


    _allTeams = iterations%2 ===0 ?  this.allTeams.sort((a,b) =>  b.eq - a.eq) : this.allTeams.sort((a,b) =>  a.eq - b.eq); ;
     _allTeams = this.allTeams.sort(function(a,b){return a.length - b.length});

    return _allTeams[0];
}
 dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a, b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
  }
  teamPower(team){
    console.log('team : ' + team.map(function(a){return a.name}));
    let sum =  team.reduce(function(a, b) { return a + b.strength; }, 0);
    console.log( 'team total strngth : ' + sum);
    return sum;
  }
  eqAll(teams) {
    let that = this;
    teams.forEach(function (team, key) {
        team.eq = that.teamPower(team);
    });
  }

}
