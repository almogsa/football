import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {PlayersPage} from '../players/players';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PlayersPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = HomePage;

  constructor() {

  }
}
