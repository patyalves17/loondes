import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-add-look',
  templateUrl: 'add-look.html',
})
export class AddLook {
  look: Look;
  currentPhoto;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public lookProvider: LookProvider,
    public toastCtrl: ToastController,
    private camera: Camera) {
    this.look = new Look();
    this.getPhoto();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLook');
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





  salvar() {
    console.log("salvar");
    console.log(this.look);
    //this.lookProvider.addLook(this.look);
    this.lookProvider.addLook(this.look).then(ref => {
      this.presentToast();
     // this.navCtrl.setRoot("HomePage");
    }, function(error){
      console.log(error);
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
