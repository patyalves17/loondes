import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-look',
  templateUrl: 'add-look.html',
})
export class EditLook {
  look : Look;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public lookProvider: LookProvider,
              public toastCtrl: ToastController) {
    this.look= new Look();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLook');
    // console.log(this.navParams.get("look"));
     this.look = this.navParams.get("look");
  }
  salvar(){
    console.log("salvar");
    this.lookProvider.editLook(this.look).then(ref => {
      this.presentToast();
      this.navCtrl.setRoot("HomePage");
    });

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Saved successfully',
      duration: 3000
    });
    toast.present();
  }
}
