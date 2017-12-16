import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, IonicPage, App, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service';
import { NgForm } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  // @ViewChild(Nav) nav: Nav;
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public menu: MenuController,
              public app: App,
              private toastCtrl: ToastController,
              private authService: AuthService) {
    this.menu.swipeEnable(false);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  // login(){
  //   console.log("login");
  //   this.navCtrl.setRoot(TabsPage);
  // }
  login() {
    console.log("login");
    if (this.form.form.valid) {
      console.log(this.user);

      this.authService.signIn(this.user)
        .then(() => {
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }
  }

  createAccount() {
    this.navCtrl.push("Sigup");
  }

}
