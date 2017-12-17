import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Nav, ToastController, LoadingController, AlertController } from 'ionic-angular';
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
  loading: any;
  textShare: string;
  // uId: string;

  constructor(public navCtrl: NavController,
    public lookProvider: LookProvider,
    private afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing) {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present().then(() => {
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
      setTimeout(() => {
        this.loading.dismiss()
      }, 1000);
    });


  }




  editLook(look) {
    console.log(look);
    this.navCtrl.setRoot("EditLook", { look: look });
  }

  shareLook(look, shareWith: string) {
    console.log("share whith "+ shareWith);
    console.log(look);
    this.textShare = "";



    let alert = this.alertCtrl.create();
    alert.setTitle('Share?');

    alert.addInput({
      type: 'checkbox',
      label: 'name',
      value: 'name: ' + look.name,
      checked: true
    });

    if (look.date) {
      alert.addInput({
        type: 'checkbox',
        label: 'date',
        value: 'date: ' + look.date
      });
    };

    if (look.place) {
      alert.addInput({
        type: 'checkbox',
        label: 'place',
        value: 'place: ' + look.place
      });
    };


    if (look.style) {
      alert.addInput({
        type: 'checkbox',
        label: 'style',
        value: 'style: ' + look.style
      });
    };


    if (look.author) {
      alert.addInput({
        type: 'checkbox',
        label: 'author',
        value: 'author: ' + look.author
      });
    };

    if (look.products) {
      alert.addInput({
        type: 'checkbox',
        label: 'products',
        value: 'products: ' + look.products
      });
    };

    if (look.description) {
      alert.addInput({
        type: 'checkbox',
        label: 'description',
        value: 'description: ' + look.description
      });
    };

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        for (var i = 0; i < data.length; i++) {
          this.textShare += data[i] + "; ";
        }
        console.log(this.textShare);


       
        if (shareWith == "facebook") {
          console.log("share with facebook");
          this.socialSharing.shareViaFacebookWithPasteMessageHint("Message via Facebook", look.image, null)
            .then(() => { },
            () => {
              this.presentToast("We are sorry . We could not share your look");
            })
        } else if (shareWith == "instagram") {
          console.log("share with instagram");
          this.socialSharing.shareViaInstagram(this.textShare, look.image)
            .then(() => { },
            () => {
              this.presentToast("We are sorry . We could not share your look");
            })
        } else if (shareWith == "twitter") {
          console.log("share with twitter");
          this.socialSharing.shareViaTwitter(this.textShare, look.image, null)
            .then(() => { },
            () => {
              this.presentToast("We are sorry . We could not share your look");
            })
        } else if (shareWith == "whatsapp") {
          console.log("share with whatsapp");
          this.socialSharing.shareViaWhatsApp(this.textShare, look.image, null)
            .then(() => { },
            () => {
              this.presentToast("We are sorry . We could not share your look");
            })
        }



        // // shareViaFacebookWithPasteMessageHint(message, image, url, pasteMessageHint)
        // // shareViaTwitter(message, image, url)
        // this.socialSharing.shareViaTwitter("Message via Facebook", look.image, null)
        //   .then(() => { },
        //   () => {
        //     this.presentToast("We are sorry . We could not share your look");
        //   })


      }
    });
    alert.present();


  }

  remove(look) {
    console.log("remove look");
    console.log(look);
    console.log(look.key);
    this.lookProvider.deleteLook(look.key).then(ref => {
      this.presentToast("Delete successfully");
    });

  }
  presentToast(menssage: string) {
    let toast = this.toastCtrl.create({
      message: menssage,
      duration: 3000
    });
    toast.present();
  }


}
