import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, IonicPage } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-sigup',
  templateUrl: 'sigup.html',
})
export class Sigup {
  user: User = new User();
  @ViewChild('form') form: NgForm;


  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    // private storage: Storage,
    public menu: MenuController) {
      this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sigup');
  }
  
   
  createAccount() {
    if (this.form.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authService.createUser(this.user)
        .then((user: any) => {
          // user.sendEmailVerification();

              // this.storage.set('userUID', user.uid)

              //   this.storage.get('userUID').then((val) => {
              //     console.log('User userUID', val);
              //   });

          toast.setMessage('Usuário criado com sucesso.');
          toast.present();

          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          console.log(error);
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('E-mail is already in use.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('E-mail is not valid.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Operation not allowed.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('Weak password.');
          }
          toast.present();
        });
    }
  }


}
