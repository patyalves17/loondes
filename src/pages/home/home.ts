import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Nav } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { Observable } from 'rxjs/Observable';
import { EditLook } from '../add-look/edit-look';

import { AuthService } from '../../providers/auth-service';
import { AngularFireAuth } from 'angularfire2/auth'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  LookList$: Observable<Look[]>;
  look: Look;
  // uId: string;

  constructor(public navCtrl: NavController,
    public lookProvider: LookProvider,
    private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        // this.uId=user.uid;
        this.LookList$ = this.lookProvider
          .getLookByUser(user.uid) // gets DB list
          .snapshotChanges() // key and value
          .map(
          changes => {
            return changes.map(c => ({
              key: c.payload.key, ...c.payload.val()
            }))
          }
          )
      };
    });




    // this.LookList$ = this.lookProvider
    // .getLookList() // gets DB list
    // .snapshotChanges() // key and value
    // .map(
    //   changes => {
    //     return changes.map(c => ({
    //       key: c.payload.key, ... c.payload.val()
    //     }))
    //   }
    // )

  }


  editLook(look) {
    console.log(look);
    this.navCtrl.setRoot("EditLook", { look: look });


  }


}
