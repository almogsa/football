import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {PlayersPage} from '../players/players';
import { SettingsPage } from "../settings/settings";
import { TeamsPage } from "../teams/teams";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PlayersPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
