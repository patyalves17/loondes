import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule} from 'angularfire2'
import { AngularFireDatabaseModule} from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { LookProvider } from '../providers/look-provider';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AuthService } from '../providers/auth-service';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LookProvider,
    AuthService
  ]
})
export class AppModule {}
