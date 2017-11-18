import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {PlayersApiProvider} from '../../providers/players-api/players-api';
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string;


  constructor(private loadingController: LoadingController,
              private nav: NavController,
             
              private playersApi: PlayersApiProvider) { }

  ionViewDidLoad() {
    //let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.playersApi.getTeamsData().then(data => {
        this.allTeams = data;
        this.allTeamDivisions = data;
          /*_.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();*/

        console.log('division teams', this.teams);
        loader.dismiss();
      });
    });

  }

  itemTapped($event, team){
    localStorage.setItem('groupUser',JSON.stringify(team));
    this.nav.popToRoot().then(x => {
      this.nav.push(TabsPage, team);
    });
   // this.nav.setRoot(TabsPage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    this.allTeamDivisions.forEach( td => {
      let teams = td.divisionTeams.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }

}
