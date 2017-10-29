webpackJsonp([0],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_players_api_players_api__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_details_player_details__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the PlayersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PlayersPage = (function () {
    function PlayersPage(navCtrl, navParams, playaers_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.playaers_api = playaers_api;
        this.allTeams = [];
        this.arrivedPlayers = [];
        this.penddingdPlayers = [];
        this.default_img = '../assets/empty_profile.png';
        // gitHubUsers.load().subscribe(users => {
        //   console.log(users);
        //   this.users=users;
        //   this.originalUsers = users;
        // })
    }
    PlayersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad UsersPage');
        this.playaers_api.load2().subscribe(function (data) {
            console.log('SUBSCRIBE load2' + data);
            _this.players = data;
            _this.refresh();
        });
        //  this.playaers_api.load().then((res) => { 
        //    this.players = res;
        //    console.log('response' + res );
        //    this.refresh();
        //    });
        //this.line();
    };
    PlayersPage.prototype.goToDetails = function (player) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__player_details_player_details__["a" /* PlayerDetailsPage */], { player: player });
    };
    PlayersPage.prototype.search = function (searchEvent) {
        var term = searchEvent.target.value;
        if (term.trim() === '' || term.trim().length < 3) {
            this.users = this.originalUsers;
        }
        else {
            // this.gitHubUsers.searchUsers(term).subscribe(users => {
            //   this.users = users;
            // })
        }
    };
    PlayersPage.prototype.line = function () {
        this.arrivedPlayers = this.players.filter(function (player) { return player.arrive === true; });
        this.penddingdPlayers = this.players.filter(function (player) { return player.arrive === false; });
        var sortedPlayer = Object.assign([], this.arrivedPlayers.sort(function (a, b) { return b.strength - a.strength; }));
        var total = this.arrivedPlayers.length;
        console.log('total : ' + total);
        var players_in_group = 4; // number of players in each team
        var remainder = total % players_in_group;
        var missingPlayers = players_in_group - remainder;
        var teams = (total - remainder) / players_in_group;
        console.log('teams : ' + teams);
        var hasRemainder = false;
        var that = this;
        if (remainder != 0) {
            if (missingPlayers > 0) {
                for (var i = 0; i < missingPlayers; i++) {
                    var player = JSON.parse(JSON.stringify(sortedPlayer[i]));
                    player.name = 'miss' + i;
                    player.strength = that.getAverageStrength(this.arrivedPlayers, teams, i);
                    sortedPlayer.push(player);
                }
            }
            teams++;
            // hasRemainder = true;
        }
        sortedPlayer = sortedPlayer.sort(function (a, b) { return b.strength - a.strength; });
        var teamA = [];
        var teamB = [];
        var teamC = [];
        var teamD = [];
        var teamE = [];
        var lastteam = 0;
        var iterations = 1;
        this.allTeams = [teamA, teamB, teamC, teamD, teamE];
        this.allTeams = this.allTeams.slice(0, -(this.allTeams.length - teams));
        sortedPlayer.forEach(function (value, key) {
            that.getTeamtoAddPlayer(that.allTeams, iterations, hasRemainder, players_in_group, lastteam).push(value);
            lastteam++;
            if (lastteam > teams - 1) {
                lastteam = 0;
                iterations++;
                that.allTeams = that.allTeams.sort(function (a, b) { return a.eq - b.eq; });
            }
            console.log('team A : ' + teamA.length);
            console.log('team B : ' + teamB.length);
            console.log('team C : ' + teamC.length);
            console.log('team D : ' + teamD.length);
            console.log('team E : ' + teamE.length);
            console.log('last team: ' + lastteam);
            that.eqAll(that.allTeams);
            // console.log('eq A: ' + teamA.eq);
            // console.log('eq B: ' + teamB.eq);
            // console.log('eq C: ' + teamC.eq);
            // console.log('eq D: ' + teamD.eq);
        });
        console.log(JSON.stringify(sortedPlayer));
        console.log('arrived players: ' + sortedPlayer.length);
        that.teamPower(this.players);
    };
    PlayersPage.prototype.getAverageStrength = function (players, teamNumber, iteration) {
        var strength = players.map(function (player) { return player.strength; }).slice(iteration * teamNumber, (iteration + 1) * teamNumber).reduce(function (accumulator, currentValue) { return accumulator + currentValue; }) / teamNumber;
        console.log('strength** ' + strength);
        return strength;
    };
    PlayersPage.prototype.teamPower = function (team) {
        debugger;
        console.log('team : ' + team.map(function (a) { return a.name; }));
        var sum = team.reduce(function (a, b) { return a + b.strength; }, 0);
        console.log('team total strngth : ' + sum);
        return sum;
    };
    PlayersPage.prototype.eqAll = function (teams) {
        var that = this;
        teams.forEach(function (team, key) {
            team.eq = that.teamPower(team);
        });
    };
    PlayersPage.prototype.resetPlayers = function () {
        // this.playaers_api.resetPlayers();
        // this.players.map( (x, i, ar) => ar[i].arrive = false);
        // this.refresh();
    };
    PlayersPage.prototype.updatePlayer = function (player, index) {
        var itemIndex = this.players.findIndex(function (x) { return x._id == player._id; });
        this.players[itemIndex].arrive = true;
        this.playaers_api.updatePlayer(player, { arrive: true });
        this.refresh();
        console.log();
    };
    PlayersPage.prototype.refresh = function () {
        this.arrivedPlayers = this.players.filter(function (player) { return player.arrive === true; });
        this.penddingdPlayers = this.players.filter(function (player) { return player.arrive === false; });
    };
    PlayersPage.prototype.getTeamtoAddPlayer = function (index, iterations, hasRemainder, players_in_group, lastteam) {
        var _allTeams = this.allTeams;
        // if ((iterations == players_in_group) && hasRemainder) {
        //   _allTeams = this.allTeams.sort(this.dynamicSort('-eq'));
        //     return _allTeams[lastteam];
        // }
        _allTeams = this.allTeams.sort(function (a, b) { return a.length - b.length; });
        _allTeams = this.allTeams.sort(function (a, b) { return a.eq - b.eq; });
        return _allTeams[0];
    };
    PlayersPage.prototype.dynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    return PlayersPage;
}());
PlayersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-players',template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\pages\players\players.html"*/'<!--\n\n  Generated template for the PlayersPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n      <button ion-button icon-only menuToggle>\n\n          <ion-icon name="menu"></ion-icon> \n\n        </button>\n\n    <ion-title>players\n\n    <ion-badge>{{arrivedPlayers.length}}</ion-badge>\n\n  </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <div class=" bench-background"  style="padding-top: 5px;padding-bottom: 5px;"  *ngIf="arrivedPlayers.length > 10">\n\n        <div class="" *ngFor="let player2 of arrivedPlayers.slice(10,30)"  >\n\n            <div class="child" (click)="goToDetails(player2)">\n\n            <img [src]="player2.img || default_img" class="radius avatar" style="box-shadow: 0 0 0 2px #fff, 0 0 0 2px #999, 0 0px 5px 4px rgba(0,0,0,.2)" src="https://graph.facebook.com/258153891344790/picture">\n\n            <div> {{player2.name}}</div>\n\n          </div>\n\n          </div>  \n\n        <!-- <div class="" style="width: 70%;  height: 58px;margin: 0 auto;display:flex">\n\n            <ion-scroll scrollX="true" class="wide-as-needed" [ngStyle]="{\'left\': \'70px\'}" style="position: relative;\n\n            top: 5px;\n\n            margin: 0px auto;\n\n            width: 100%;\n\n           ">\n\n               \n\n              </ion-scroll> \n\n            \n\n        </div> -->\n\n        </div>\n\n  \n\n  <div [style.height]="arrivedPlayers.length > 10 ? \'calc(100% - 108px)\' : \'calc(100% - 55px)\'"  class="players-main">\n\n\n\n  \n\n    <div class="first-player">\n\n        <div class="item" *ngFor="let player2 of arrivedPlayers.slice(0,1)" >\n\n        <div class="child" (click)="goToDetails(player2)">\n\n            <img [src]="player2.img || default_img" class="radius avatar" style="box-shadow: 0 0 0 2px #fff, 0 0 0 2px #999, 0 0px 5px 4px rgba(0,0,0,.2)" src="https://graph.facebook.com/258153891344790/picture">\n\n            <div> {{player2.name}}</div>  \n\n          </div>\n\n    </div>\n\n  </div>\n\n    <div class="container">\n\n    <div class="item" *ngFor="let player2 of arrivedPlayers.slice(1,5)" >\n\n      <div class="child" (click)="goToDetails(player2)">\n\n      <img [src]="player2.img || default_img" class="radius avatar" style="box-shadow: 0 0 0 2px #fff, 0 0 0 2px #999, 0 0px 5px 4px rgba(0,0,0,.2)" >\n\n      <div> {{player2.name}}</div>\n\n    </div>\n\n    </div>   \n\n  </div>\n\n  <div class="container">\n\n    <div class="item" *ngFor="let player2 of arrivedPlayers.slice(5,9)" >\n\n      <div class="child" (click)="goToDetails(player2)">\n\n      <img [src]="player2.img || default_img" class="radius avatar" style="box-shadow: 0 0 0 2px #fff, 0 0 0 2px #999, 0 0px 5px 4px rgba(0,0,0,.2)" >\n\n      <div> {{player2.name}}</div>\n\n    </div>\n\n    </div>   \n\n    <div class="">\n\n        <div class="item" *ngFor="let player2 of arrivedPlayers.slice(9,10)" >\n\n        <div class="child" (click)="goToDetails(player2)">\n\n            <img [src]="player2.img || default_img" class="radius avatar" style="box-shadow: 0 0 0 2px #fff, 0 0 0 2px #999, 0 0px 5px 4px rgba(0,0,0,.2)" >\n\n            <div> {{player2.name}}</div>  \n\n          </div>\n\n    </div>\n\n  </div> \n\n  </div>\n\n \n\n\n\n  \n\n\n\n</div>\n\n\n\n\n\n<div class=" bench-background" style="  margin-bottom: -5px;flex-wrap:wrap" >\n\n    <div class="item-bench" *ngFor="let player2 of penddingdPlayers"   (click)="updatePlayer(player2,$index)">\n\n        <div class="child">\n\n        <img [src]="player2.img || default_img" class="radius avatar" >\n\n        <div> {{player2.name}}</div>\n\n      </div>\n\n      </div>  \n\n\n\n\n\n    <!-- <div class="" style="width: 80%;  height: 58px;margin: 0 auto;display:flex">\n\n        <ion-scroll scrollX="true" class="wide-as-needed"  style="position: relative;\n\n        top: 5px;\n\n        margin: 0px auto;\n\n        width: 100%;\n\n       ">\n\n          \n\n          </ion-scroll> \n\n        \n\n    </div> -->\n\n    </div>\n\n    \n\n\n\n\n\n\n\n\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\pages\players\players.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_players_api_players_api__["a" /* PlayersApiProvider */]])
], PlayersPage);

//# sourceMappingURL=players.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_players_players__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(http, afAuth) {
        this.http = http;
        this.afAuth = afAuth;
        console.log('Hello AuthProvider Provider');
        //  this.user = this.afAuth.authState;
    }
    AuthProvider.prototype.login = function () {
        this.afAuth.auth.signInWithRedirect(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider());
        __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().getRedirectResult().then(function (authData) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_players_players__["a" /* PlayersPage */]);
            console.log('Login Success');
        }).catch(function (error) {
            console.log(error);
        });
        // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
        //   then(() => {
        //     console.log('Login Success');
        //     // this.navCtrl.push(PlayersPage); // provider can't import nav provider 
        //   })
        //   .catch(error => console.log('Login failed'));
    };
    AuthProvider.prototype.logout = function () {
        return this.afAuth.auth.signOut();
        //  this.navCtrl.push(LoginPage);
    };
    AuthProvider.prototype.getAuth = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.afAuth.authState.take(1).subscribe(function (auth) {
                if (!auth)
                    resolve(false);
                else
                    resolve(true);
            });
        });
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_players_api_players_api__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player_details_player_details__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AboutPage = (function () {
    function AboutPage(navCtrl, playaers_api, events) {
        this.navCtrl = navCtrl;
        this.playaers_api = playaers_api;
        this.events = events;
        this.allTeams = [];
        this.arrivedPlayers = [];
        this.penddingdPlayers = [];
        this.default_img = '../assets/empty_profile.png';
        // let playersRef = this.firebase.database.ref(baseURL);
        // playersRef.on('child_changed', function (snap) {
        //   console.log('****CHILD CHANGED***');
        //  });
        events.subscribe('player:updated', function (player, time) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('player:updated * * ', player, 'at', time);
            //   this.ionViewDidEnter();
        });
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad UsersPage');
        this.playaers_api.loadPlayers().then(function (data) {
            console.log('Line Page get players load2' + data);
            _this.players = data;
            _this.line();
        });
    };
    AboutPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter UsersPage');
        this.playaers_api.loadPlayers().then(function (data) {
            console.log('Line Page get players load2' + data);
            _this.players = data;
            _this.line();
        });
    };
    AboutPage.prototype.goToDetails = function (player) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__player_details_player_details__["a" /* PlayerDetailsPage */], { player: player });
    };
    AboutPage.prototype.line = function () {
        this.arrivedPlayers = this.players.filter(function (player) { return player.arrive === true; });
        if (this.arrivedPlayers.length < 8) {
            return;
        }
        this.penddingdPlayers = this.players.filter(function (player) { return player.arrive === false; });
        var sortedPlayer = Object.assign([], this.arrivedPlayers.sort(function (a, b) { return b.strength - a.strength; }));
        var total = this.arrivedPlayers.length;
        console.log('total : ' + total);
        var players_in_group = 4; // number of players in each team
        var remainder = total % players_in_group;
        var missingPlayers = players_in_group - remainder;
        var teams = (total - remainder) / players_in_group;
        console.log('teams : ' + teams);
        var hasRemainder = false;
        var that = this;
        if (remainder != 0) {
            if (missingPlayers > 0) {
                for (var i = 0; i < missingPlayers; i++) {
                    var player = JSON.parse(JSON.stringify(sortedPlayer[i]));
                    player.name = 'miss' + i;
                    player.strength = that.getAverageStrength(this.arrivedPlayers, teams, i);
                    sortedPlayer.push(player);
                }
            }
            teams++;
            // hasRemainder = true;
        }
        sortedPlayer = sortedPlayer.sort(function (a, b) { return b.strength - a.strength; });
        var teamA = [];
        var teamB = [];
        var teamC = [];
        var teamD = [];
        var teamE = [];
        var teamF = [];
        var lastteam = 0;
        var iterations = 1;
        this.allTeams = [teamA, teamB, teamC, teamD, teamE, teamF];
        this.allTeams = this.allTeams.slice(0, -(this.allTeams.length - teams));
        sortedPlayer.forEach(function (value, key) {
            that.getTeamtoAddPlayer(that.allTeams, iterations, hasRemainder, players_in_group, lastteam).push(value);
            lastteam++;
            if (lastteam > teams - 1) {
                lastteam = 0;
                iterations++;
                that.allTeams = that.allTeams.sort(function (a, b) { return a.eq - b.eq; });
            }
            console.log('team A : ' + teamA.length);
            console.log('team B : ' + teamB.length);
            console.log('team C : ' + teamC.length);
            console.log('team D : ' + teamD.length);
            console.log('team E : ' + teamE.length);
            console.log('last team: ' + lastteam);
            that.eqAll(that.allTeams);
            // console.log('eq A: ' + teamA.eq);
            // console.log('eq B: ' + teamB.eq);
            // console.log('eq C: ' + teamC.eq);
            // console.log('eq D: ' + teamD.eq);
        });
        console.log(JSON.stringify(sortedPlayer));
        console.log('arrived players: ' + sortedPlayer.length);
        that.teamPower(this.players);
    };
    AboutPage.prototype.getAverageStrength = function (players, teamNumber, iteration) {
        var strength = players.map(function (player) { return player.strength; }).slice(iteration * teamNumber, (iteration + 1) * teamNumber).reduce(function (accumulator, currentValue) { return accumulator + currentValue; }) / teamNumber;
        console.log('strength** ' + strength);
        return strength;
    };
    AboutPage.prototype.getTeamtoAddPlayer = function (index, iterations, hasRemainder, players_in_group, lastteam) {
        var _allTeams = this.allTeams;
        // if ((iterations == players_in_group) && hasRemainder) {
        //   _allTeams = this.allTeams.sort(this.dynamicSort('-eq'));
        //     return _allTeams[lastteam];
        // }
        _allTeams = this.allTeams.sort(function (a, b) { return a.length - b.length; });
        _allTeams = this.allTeams.sort(function (a, b) { return a.eq - b.eq; });
        return _allTeams[0];
    };
    AboutPage.prototype.dynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    AboutPage.prototype.teamPower = function (team) {
        console.log('team : ' + team.map(function (a) { return a.name; }));
        var sum = team.reduce(function (a, b) { return a + b.strength; }, 0);
        console.log('team total strngth : ' + sum);
        return sum;
    };
    AboutPage.prototype.eqAll = function (teams) {
        var that = this;
        teams.forEach(function (team, key) {
            team.eq = that.teamPower(team);
        });
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Line\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div *ngIf="arrivedPlayers.length < 8" style="text-align:center">Not enough players to begin a match</div>\n\n    <div *ngIf="arrivedPlayers.length > 7">\n\n    <div class="container" *ngFor="let team of allTeams" style="border-bottom: 1px solid #ebeef2;">\n\n        <div style="flex:1" class="" *ngFor="let player of team"   >\n\n          <div class="child"  (click)="goToDetails(player)">\n\n            <img [src]="player?.img || default_img" class="user-picture image" >\n\n            <div class="user-name"> {{player?.name}}</div>\n\n          </div>\n\n       </div>\n\n       <ion-badge item-right>{{teamPower(team).toFixed(0)}}</ion-badge>\n\n      </div>  \n\n    </div> \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_players_api_players_api__["a" /* PlayersApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 194:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 194;

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_details_player_details__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_players_api_players_api__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactPage = (function () {
    function ContactPage(navCtrl, playaers_api) {
        this.navCtrl = navCtrl;
        this.playaers_api = playaers_api;
    }
    ContactPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad UsersPage');
        this.playaers_api.loadPlayers().then(function (res) {
            _this.players = res;
            console.log('response contacts' + res);
        });
        //this.line();
    };
    ContactPage.prototype.goToDetails = function (player) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__player_details_player_details__["a" /* PlayerDetailsPage */], { player: player });
    };
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Contact\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list no-lines>\n\n    <ion-item *ngFor="let player of players" (click)="goToDetails(player)" style="border-bottom: 1px solid #ebeef2;">\n\n        <ion-avatar item-start>\n\n            <img [src]="player.img || \'../assets/empty_profile.png\'">\n\n          </ion-avatar>\n\n        <h2>{{player.name}}</h2>\n\n        <ion-icon [hidden]="!player.arrive" name="ios-thumbs-up-outline"></ion-icon>\n\n        <ion-icon [hidden]="player.arrive" name="ios-thumbs-down-outline"></ion-icon>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\pages\contact\contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_players_api_players_api__["a" /* PlayersApiProvider */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_players_api_players_api__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__player_details_player_details__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsPage = (function () {
    function SettingsPage(navCtrl, alertCtrl, playaers_api, authService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.playaers_api = playaers_api;
        this.authService = authService;
        this.admin = false;
        this.user = {};
    }
    SettingsPage.prototype.ionViewDidEnter = function () {
        console.log('settings did enter');
        this.isAdmin();
    };
    SettingsPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Reset Players',
            message: 'Are you sure you want to reset players?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.playaers_api.resetPlayers().then(function (x) {
                            console.log('reset players successful!!! : ' + x);
                            //     this.playaers_api.load2();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    SettingsPage.prototype.goToDetails = function (player) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__player_details_player_details__["a" /* PlayerDetailsPage */], { player: player });
    };
    SettingsPage.prototype.isAdmin = function () {
        var _this = this;
        this.authService.getAuth().then(function (isAdmin) {
            _this.admin = isAdmin;
        });
        // if(user.name && user.name ==='admin' && user.password==='admin'){
        //   this.admin=true;
        // }
    };
    SettingsPage.prototype.logOut = function () {
        localStorage.setItem('skipUser', 'false');
        this.authService.logout().then(function (x) { return console.log('log out from settings page'); });
    };
    SettingsPage.prototype.goToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'settings-home',template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Settings</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-list *ngIf="false">\n\n    <ion-item>\n\n      <ion-label fixed>Username</ion-label>\n\n      <ion-input [(ngModel)]="user.name" type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label fixed>Password</ion-label>\n\n      <ion-input [(ngModel)]="user.password" type="password"></ion-input>\n\n    </ion-item>\n\n    <div padding>\n\n      <button ion-button (click)="isAdmin(user)" color="primary" block>Sign In</button>\n\n    </div>\n\n  </ion-list>\n\n  <div *ngIf="admin">\n\n    <p>\n\n      <button ion-button full (click)="showConfirm()"> Reset Players </button>\n\n    </p>\n\n    <p>\n\n      <button ion-button full (click)="goToDetails({})"> Add New Player </button>\n\n    </p>\n\n    <p>\n\n      <button ion-button full (click)="logOut()"> logOut </button>\n\n    </p>\n\n  </div>\n\n\n\n  <div  *ngIf="!admin" (click)="goToLogin()">You don\'t have a permission to view this page. <a>go to login page</a> </div>\n\n</ion-content>'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\pages\settings\settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_players_api_players_api__["a" /* PlayersApiProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(298);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_login_login__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_about_about__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_players_players__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_player_details_player_details__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_players_api_players_api__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var firebaseConfig = {
    apiKey: "AIzaSyAOqpaVynbZgBnzZrLcnIFmorazfvUXLQc",
    authDomain: "football-wednesday.firebaseapp.com",
    databaseURL: "https://football-wednesday.firebaseio.com",
    projectId: "football-wednesday",
    storageBucket: "football-wednesday.appspot.com",
    messagingSenderId: "397610494763"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_players_players__["a" /* PlayersPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_player_details_player_details__["a" /* PlayerDetailsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["b" /* AngularFireDatabaseModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_players_players__["a" /* PlayersPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_player_details_player_details__["a" /* PlayerDetailsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_14__providers_players_api_players_api__["a" /* PlayersApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__["a" /* AngularFireAuth */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_login_login__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__["a" /* TabsPage */];
        this.afAuth.authState.subscribe(function (auth) {
            console.log('Auth', auth);
            alert(JSON.stringify(auth));
            if (!auth) {
                if (localStorage.getItem('skipUser') === 'true') {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__["a" /* TabsPage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* LoginPage */];
                }
            }
            else {
                alert('Logged with google');
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__["a" /* TabsPage */];
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayersApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var teamID = 'teams-data/3dd50aaf-6b03-4497-b074-d81703f07ee8';
var baseURL = teamID + '/players/';
/*
  Generated class for the PlayersApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// declare var firebase;
var PlayersApiProvider = (function () {
    function PlayersApiProvider(http, firebase, loadingCtrl, events) {
        var _this = this;
        this.http = http;
        this.firebase = firebase;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        console.log('Hello PlayersApiProvider Provider');
        this.db_list = firebase.list(baseURL); // list return an array of values
        this.db_object = firebase.object(baseURL + '/key');
        // this._db = firebase.database().ref('/'); // Get a firebase reference to the root this._todosRef = firebase.database().ref('todos'); // Get a firebase reference to the todos
        // console.log('DB : '+ this._db);
        // this._playersRef = firebase.database().ref('teams-data/3dd50aaf-6b03-4497-b074-d81703f07ee8'); // Get a firebase reference to the todos
        // console.log('DB2 : '+ this._playersRef);
        // this._playersRef.on('child_added', this.handleData, this); // ***ADD THIS LINE***
        firebase.list(baseURL).subscribe(function (data) {
            _this.data = data;
        });
        this.loadPlayers();
    }
    PlayersApiProvider.prototype.handleData = function () {
        console.log('handle data');
    };
    PlayersApiProvider.prototype.updatePlayer = function (player, config) {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
        //this.db_list.update(player.$key,player); update by list
        return new Promise(function (resolve) {
            _this.firebase.object(baseURL + (player.$key || player.key)).update(config).then(function (x) {
                _this.loader.dismiss();
                _this.events.publish('player:updated', player, Date.now());
                console.log(' player updated: ' + x);
                resolve(player);
            })
                .catch(function (x) { return console.log('error when updating user'); });
        });
    };
    PlayersApiProvider.prototype.removePlayer = function (player, config) {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
        //this.firebase.list(baseURL).remove(id);
        this.firebase.object(baseURL + (player.$key || player.key)).remove().then(function (x) {
            _this.loader.dismiss();
            console.log(' player deleted: ' + x);
        });
    };
    PlayersApiProvider.prototype.addPlayer = function (player) {
        var _this = this;
        player.index = 0;
        player.admin = false;
        player.arrive = false;
        var dbRef = this.firebase.database.ref(baseURL);
        //   let key = dbRef.push();
        this.getLastFromList(dbRef, function (last) {
            //  dbRef.child(last).set(player);
            _this.db_list.update(last.toString(), player);
        });
    };
    PlayersApiProvider.prototype.getLastFromList = function (ref, cb) {
        ref.limitToLast(1).once("child_added", function (snapshot) {
            cb(Number.parseInt(snapshot.key) + 1);
        });
    };
    PlayersApiProvider.prototype.resetPlayers = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
        // let playersRef = this.firebase.database.ref(baseURL);
        //  playersRef.on('child_changed', function (snap) {
        //    console.log('****CHILD CHANGED***');
        //   });
        return new Promise(function (resolve, reject) {
            _this.loadPlayers().then(function (players) {
                _this.data = players;
                console.log('starting to reset players' + players);
                var field = 'arrive';
                var value = false;
                var players2Update = _this.bulkUpdate(players, field, value);
                _this.firebase.database.ref().update(players2Update).then(function (x) {
                    _this.loader.dismiss();
                    console.log('finish reset players');
                    resolve(_this.data);
                });
            }).catch(function (error) {
                reject("Error loading players " + error.code);
            });
        });
    };
    PlayersApiProvider.prototype.getPlayer = function (player) {
        var _this = this;
        new Promise(function (resolve) {
            var player2 = _this.firebase.object(baseURL + (player.$key || player.key)).subscribe(function (data) {
                resolve(player2);
            });
        });
    };
    PlayersApiProvider.prototype.load2 = function () {
        return this.firebase.list(baseURL);
    };
    PlayersApiProvider.prototype.loadPlayers = function () {
        var _this = this;
        //  if(this.data){
        //      return Promise.resolve(this.data);
        //  }
        return new Promise(function (resolve, reject) {
            _this.db_list.take(1).subscribe(function (players) {
                resolve(players);
                _this.data = players;
                console.log('players:', players);
            });
        });
    };
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
    PlayersApiProvider.prototype.getShoppingItems = function () {
        return this.firebase.list(baseURL);
    };
    PlayersApiProvider.prototype.addItem = function (name) {
        this.firebase.list(baseURL).push(name);
    };
    PlayersApiProvider.prototype.removeItem = function (id) {
        this.firebase.list(baseURL).remove(id);
    };
    PlayersApiProvider.prototype.bulkUpdate = function (ref, field, value) {
        // object to hold the bulk update
        var batch = {};
        // Using a ES6 promise here, use a library or polyfil for compatibility
        // using Object.keys will allow us to iterate over an array or object
        Object.keys(ref).forEach(function (r) {
            // get the push id from the child reference, no server trip is made here
            var pushId = baseURL + r + '/' + field;
            // get the value from the collection
            var itemValue = value;
            // using the pushId, assign the value to the bulk update object
            batch[pushId] = itemValue;
        });
        return batch;
    };
    return PlayersApiProvider;
}());
PlayersApiProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Events */]])
], PlayersApiProvider);

//# sourceMappingURL=players-api.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_players_api_players_api__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the PlayerDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PlayerDetailsPage = (function () {
    function PlayerDetailsPage(navCtrl, navParams, players_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.players_api = players_api;
        this.player = {};
        this.player = {};
        // this.player = this.navParams.data;
    }
    PlayerDetailsPage.prototype.ionViewDidLoad = function () {
        this.player = {};
        console.log('ionViewDidLoad PlayerDetailsPage');
        this.player = this.navParams.get('player');
        console.log('Player details: ' + JSON.stringify(this.player));
        //  this.players_api.getPlayer(player);
    };
    PlayerDetailsPage.prototype.updatePlayer = function (player) {
        var _this = this;
        console.log('Player ::: ' + JSON.stringify(player));
        this.players_api.updatePlayer(player, player).then(function (x) {
            _this.navCtrl.pop();
        });
    };
    PlayerDetailsPage.prototype.addNewPlayer = function (player) {
        console.log('Adding new player : ' + JSON.stringify(player));
        this.players_api.addPlayer(player);
    };
    return PlayerDetailsPage;
}());
PlayerDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-player-details',template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\pages\player-details\player-details.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title> {{player?.name}}\'s details</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding >\n\n  <ion-list>\n\n      <ion-item >\n\n          <ion-label> Name</ion-label>\n\n          <ion-input text-right [(ngModel)]="player.name"></ion-input>\n\n        </ion-item>\n\n      <ion-item>\n\n          <ion-label> Arrive</ion-label>\n\n          <ion-toggle  [(ngModel)]="player.arrive"  (ionChange)="updatePlayer(player)" ></ion-toggle>\n\n        </ion-item>\n\n        <ion-item [hidden]="!player.admin">\n\n            <ion-label> Admin</ion-label>\n\n            <ion-toggle  [(ngModel)]="player.admin"></ion-toggle>\n\n          </ion-item>\n\n    <ion-item>\n\n      <ion-label>Phone</ion-label>\n\n      <ion-input  text-right [(ngModel)]="player.phone"></ion-input>\n\n    </ion-item>\n\n     <ion-item>\n\n      <ion-label>Number</ion-label>\n\n      <ion-badge [hidden]="!player.index" item-right>{{player?.number}}</ion-badge>\n\n      <ion-input [hidden]="player.index" text-right [(ngModel)]="player.number"></ion-input>\n\n    </ion-item>\n\n     <ion-item>\n\n      <ion-label>Strength \n\n          <ion-badge item-right>{{player?.strength}}</ion-badge>\n\n      </ion-label>\n\n        \n\n          <ion-range item-right [(ngModel)]="player.strength" min="1" max="100" step="0.01" pin="true" >\n\n              <ion-label range-left class="small-text">0</ion-label>\n\n              <ion-label range-right>100</ion-label>\n\n          </ion-range>\n\n    \n\n      \n\n     \n\n      <!-- <ion-badge item-right>{{player?.strength}}</ion-badge> -->\n\n    </ion-item>\n\n     <ion-item>\n\n      <ion-label>Image</ion-label>\n\n      <ion-input  item-right type="text"  [(ngModel)]="player.img" ></ion-input>\n\n      <!-- <ion-text item-right>{{player?.img}}  [(ngModel)]="player.img"</ion-text> -->\n\n    </ion-item>\n\n  </ion-list>    \n\n  <button *ngIf="player.index === 0 || player.index > 0" ion-button full (click)="updatePlayer(player)">Update</button>\n\n  <button *ngIf="player.index == undefined" ion-button full (click)="addNewPlayer(player)">Add New Player</button>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\pages\player-details\player-details.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_players_api_players_api__["a" /* PlayersApiProvider */]])
], PlayerDetailsPage);

//# sourceMappingURL=player-details.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.loginUser = function () {
        return this.authService.login();
    };
    LoginPage.prototype.logoutUser = function () {
        localStorage.setItem('skipUser', 'false');
        this.authService.logout();
    };
    LoginPage.prototype.skipLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */]);
        //store the data in the key value format
        localStorage.setItem('skipUser', 'true');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <button ion-button block color="danger" (click)="loginUser()" *ngIf="!userProfile">\n\n    <ion-icon name="logo-googleplus"></ion-icon>\n\n    Login with Google\n\n  </button>\n\n  <button ion-button block color="primary" (click)="skipLogin()" *ngIf="!userProfile">\n\n    \n\n    Skip\n\n  </button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__players_players__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__players_players__["a" /* PlayersPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__settings_settings__["a" /* SettingsPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Dev\ionic-tabs-app\ggg\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Field" tabIcon="shirt"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="Line" tabIcon="podium"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Players" tabIcon="contacts"></ion-tab>\n\n  <ion-tab [root]="tab4Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Dev\ionic-tabs-app\ggg\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ })

},[281]);
//# sourceMappingURL=main.js.map