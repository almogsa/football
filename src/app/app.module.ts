import { LoginPage } from './../pages/login/login';
import { AuthProvider } from './../providers/auth/auth';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { PlayersPage } from '../pages/players/players';
import { PlayerDetailsPage } from '../pages/player-details/player-details';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlayersApiProvider } from '../providers/players-api/players-api';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SettingsPage } from "../pages/settings/settings";
import { AngularFireAuth } from "angularfire2/auth";
import { GooglePlus } from '@ionic-native/google-plus';


export const firebaseConfig = {
  apiKey: "AIzaSyAOqpaVynbZgBnzZrLcnIFmorazfvUXLQc",
  authDomain: "football-wednesday.firebaseapp.com",
  databaseURL: "https://football-wednesday.firebaseio.com",
  projectId: "football-wednesday",
  storageBucket: "football-wednesday.appspot.com",
  messagingSenderId: "397610494763"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    SettingsPage,
    TabsPage,
    PlayersPage,
    LoginPage,
    PlayerDetailsPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    SettingsPage,
    TabsPage,
    PlayersPage,
    LoginPage,
    PlayerDetailsPage

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlayersApiProvider,
    AuthProvider,
    AngularFireAuth,
    GooglePlus
    
    
    
  ]
})
export class AppModule {}
