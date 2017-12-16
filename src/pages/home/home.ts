import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Nav, ToastController } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { Observable } from 'rxjs/Observable';
import { EditLook } from '../add-look/edit-look';

import { AuthService } from '../../providers/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { SocialSharing } from '@ionic-native/social-sharing';

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
    private afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private socialSharing: SocialSharing) {

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

  shareLook(look) {
    console.log("share");
    console.log(look);
    this.socialSharing.shareViaFacebook("Message via Facebook",look.image /*Image*/,null)
    .then(()=>{ },
      ()=>{
         alert("We are sorry . We could not share your look");
      })
  }

  remove(look) {
    console.log("remove look");
    console.log(look);
    console.log(look.key);
    this.lookProvider.deleteLook(look.key).then(ref => {
      this.presentToast();
      // this.navCtrl.setRoot("HomePage");
    });

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Delete successfully',
      duration: 3000
    });
    toast.present();
  }


}
