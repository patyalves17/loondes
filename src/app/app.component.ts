import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Sigup } from '../pages/sigup/sigup';
import { Storage } from '@ionic/storage';

import { AuthService } from '../providers/auth-service';
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  // rootPage:any = TabsPage;
  rootPage: string = "Login";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public app: App,
              private storage: Storage,
              private authService: AuthService,
              private afAuth: AngularFireAuth) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'About', component: "About" }
    ];

    afAuth.authState.subscribe(user => {
      if (user) {
        console.log("ja esta logado");
        this.app.getRootNav().setRoot(TabsPage);
      } else {
        console.log("Faça Login");
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
  if(page.title=="Home"){
    this.app.getRootNav().setRoot(TabsPage);
  }else{
    this.nav.setRoot(page.component);
  }

  }

  Logout(){
    // this.storage.clear();
    this.authService.signOut()
      .then(() => {
        this.storage.get('userUID').then((val) => {
          console.log('User userUID', val);
        });         
        this.nav.setRoot("Login");
        // this.navCtrl.parent.parent.setRoot(SigninPage);
      })
      .catch((error) => {
        console.error(error);
      });

  }
}
