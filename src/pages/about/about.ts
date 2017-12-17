import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("sobre");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }
  

}
