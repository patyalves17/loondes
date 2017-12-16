import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, App } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';

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
              private camera: Camera,
              public app: App,
              public toastCtrl: ToastController) {
    this.look= new Look();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLook');
    // console.log(this.navParams.get("look"));
     this.look = this.navParams.get("look");
     console.log(this.navParams.get("look"));
  }
  salvar(){
    console.log("salvar");
    this.lookProvider.editLook(this.look).then(ref => {
      this.presentToast();
      this.app.getRootNav().setRoot(TabsPage);
    });

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Saved successfully',
      duration: 3000
    });
    toast.present();
  }

  getPhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {

      this.look.image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  
  }
}
