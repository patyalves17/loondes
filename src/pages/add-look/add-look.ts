import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-look',
  templateUrl: 'add-look.html',
})
export class AddLook {
  look : Look;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public lookProvider: LookProvider,
              public toastCtrl: ToastController) {
    this.look= new Look();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLook');
  }
  salvar(){
    console.log("salvar");
    console.log(this.look);
    //this.lookProvider.addLook(this.look);
    this.lookProvider.addLook(this.look).then(ref => {
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
