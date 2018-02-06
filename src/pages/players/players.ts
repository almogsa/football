import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PlayersApiProvider } from '../../providers/players-api/players-api';
import { PlayerDetailsPage } from "../player-details/player-details";
/**
 * Generated class for the PlayersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class PlayersPage {
  users: any[];
  originalUsers:any[];
 // players=[{"_id":"5847a1b0d1bcdd000427952a","arrive":false,"name":"יוסי","number":83,"strength":10,"__v":0,"index":0},{"_id":"5925640914729300048b038441","arrive":true,"name":"חבר-22","number":0,"strength":4,"__v":0,"index":0},{"_id":"5925640914729300048b0381","arrive":false,"name":"חבר-1","number":0,"strength":1,"__v":0,"index":0},{"_id":"5847a177d1bcdd0004279526","arrive":false,"name":"דרור","number":12,"strength":3,"__v":0,"index":0},{"_id":"5847a1a2d1bcdd0004279529","arrive":true,"name":"אבי","number":3,"strength":5,"__v":0,"index":0},{"_id":"592563e514729300048b0380","arrive":true,"name":"יואל","number":4.5,"strength":1,"__v":0,"index":1},{"_id":"5847a109d1bcdd0004279522","arrive":true,"name":"ירון","number":11,"strength":6,"__v":0,"index":1},{"_id":"5846f55f8675290004db6ea6","arrive":true,"name":"חזי","number":2,"strength":5.5,"__v":0,"index":1},{"_id":"5847a1c5d1bcdd000427952b","arrive":true,"name":"רן","number":5,"strength":6.2,"__v":0,"index":2},{"_id":"5847a18ad1bcdd0004279527","arrive":true,"name":"בני","number":4,"strength":5,"__v":0,"index":3},{"_id":"5847a162d1bcdd0004279524","arrive":true,"name":"אלון קורן","number":7,"strength":7,"__v":0,"index":4},{"_id":"5847a152d1bcdd0004279523","arrive":true,"name":"אלון ברלין","number":10,"strength":8,"__v":0,"index":5},{"_id":"5847a195d1bcdd0004279528","arrive":true,"name":"קובי","number":8,"strength":5,"__v":0,"index":6},{"_id":"5847a105d1bcdd0004279521","arrive":true,"name":"דובי","number":12,"strength":7,"__v":0,"index":7},{"_id":"5842c0cfd0cb15000453689e","arrive":true,"name":"אייל","number":99,"strength":6.5,"remark":"","phone":"55555","__v":0,"index":8},{"_id":"5847a16ed1bcdd0004279525","arrive":true,"name":"טל","number":12,"strength":4,"__v":0,"index":9},{"_id":"584325a10d5daa00041c0ca2","arrive":true,"name":"אלמוג","number":9,"strength":5.2,"phone":"0545597072","__v":0,"index":10}]
 players:any;
  allTeams = [];
  team:any;
  arrivedPlayers=[];
  penddingdPlayers=[];
  default_img = '../assets/empty_profile.png'
  constructor(public navCtrl: NavController, public navParams: NavParams, public playaers_api: PlayersApiProvider) {
    let team = localStorage.groupUser ? JSON.parse(localStorage.groupUser) : {};
    if (Object.keys(this.navParams.data.length === 0)) { // empty object
      this.team = team;
    }else{
      this.team =  this.navParams.data;
    }


    console.log('choosen team: '+ this.team)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayersPage');
    this.playaers_api.load2(this.team.id).subscribe(data=>{

      console.log('SUBSCRIBE load2' + data);
      this.players=data;
      this.refresh();
    })
    //  this.playaers_api.load().then((res) => {
    //    this.players = res;
    //    console.log('response' + res );
    //    this.refresh();
    //    });
    //this.line();
  }
  ionViewDidEnter() {
    console.log('ionViewDidLoad PlayersPage');
    // let team = JSON.parse(localStorage.getItem('groupUser'));
  /*  this.playaers_api.loadPlayers().then((res) => {
      this.players = res;
      console.log('response contacts' + res );
      this.refresh();
    });*/
  }
  goToDetails(player:any){
    this.navCtrl.push(PlayerDetailsPage, {player});
  }
  search(searchEvent ){
    let term = searchEvent.target.value;
    if(term.trim() === '' || term.trim().length < 3 ){
      this.users = this.originalUsers;

    } else {
      // this.gitHubUsers.searchUsers(term).subscribe(users => {
      //   this.users = users;
      // })
    }

  }



  line(){

    this.arrivedPlayers =  this.players.filter(function(player){ return player.arrive === true});
    this.penddingdPlayers = this.players.filter(function(player){ return player.arrive === false});
    var  sortedPlayer = Object.assign([],this.arrivedPlayers.sort( function(a,b){ return b.strength - a.strength})) ;
    var total = this.arrivedPlayers.length;
    console.log('total : ' + total);
    var players_in_group =  4; // number of players in each team
    var remainder = total % players_in_group;
    var missingPlayers = players_in_group - remainder;

    var teams = (total - remainder) / players_in_group;
    console.log('teams : ' + teams);
    var hasRemainder = false;
    var that = this;



    if (remainder != 0) {
      if(missingPlayers > 0){
        for (var i = 0; i < missingPlayers; i++) {
          var player =  JSON.parse(JSON.stringify(sortedPlayer[i]));
          player.name = 'miss'+i;
          player.strength = that.getAverageStrength(this.arrivedPlayers,teams,i);
          sortedPlayer.push(player);
        }
      }
        teams++;
       // hasRemainder = true;
    }
    sortedPlayer =  sortedPlayer.sort( function(a,b){ return b.strength - a.strength});
    var  teamA = [];
    var  teamB = [];
    var  teamC = [];
    var  teamD = [];
    var  teamE = [];
    var lastteam = 0;
    var iterations = 1;
    this.allTeams = [teamA,teamB,teamC,teamD,teamE];
    this.allTeams = this.allTeams.slice(0, -(this.allTeams.length - teams));


    sortedPlayer.forEach(function (value, key) {
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

    })


    console.log(JSON.stringify(sortedPlayer));
    console.log('arrived players: ' +  sortedPlayer.length);
    that.teamPower(this.players);

  }
  getAverageStrength(players,teamNumber,iteration){
    var strength = players.map(player => player.strength).slice(iteration*teamNumber,(iteration+1)* teamNumber).reduce((accumulator , currentValue) => accumulator + currentValue) / teamNumber;
    console.log('strength** ' + strength);
    return strength;
  }

  teamPower(team){
    debugger;
    console.log('team : ' + team.map(function(a){return a.name}));
    var sum =  team.reduce(function(a, b) { return a + b.strength; }, 0);
    console.log( 'team total strngth : ' + sum);
    return sum;
  }
  eqAll(teams) {

    var that = this;
    teams.forEach(function (team, key) {
        team.eq = that.teamPower(team);
    });
  }

  resetPlayers(){

    // this.playaers_api.resetPlayers();
    // this.players.map( (x, i, ar) => ar[i].arrive = false);
    // this.refresh();


  }
  updatePlayer(player,index){
     let itemIndex = this.players.findIndex(x => x.$key == player.$key);
     this.players[itemIndex].arrive = true;
     this.playaers_api.updatePlayer(player,{ arrive: true});
     this.refresh();

    console.log();
  }
  refresh(){
    this.arrivedPlayers =  this.players.filter(function(player){ return player.arrive === true});
    this.penddingdPlayers = this.players.filter(function(player){ return player.arrive === false});

  }
  getTeamtoAddPlayer(index, iterations, hasRemainder, players_in_group,lastteam) {

    var _allTeams = this.allTeams;
    // if ((iterations == players_in_group) && hasRemainder) {
    //   _allTeams = this.allTeams.sort(this.dynamicSort('-eq'));

    //     return _allTeams[lastteam];
    // }
    _allTeams = this.allTeams.sort(function(a,b){return a.length - b.length});
    _allTeams = this.allTeams.sort(function(a,b){return a.eq - b.eq});
    return _allTeams[0];
}
 dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

}
