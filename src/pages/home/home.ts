import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Nav } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { Observable } from 'rxjs/Observable';
import { EditLook } from '../add-look/edit-look';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  LookList$: Observable<Look[]>;
  look: Look;

  constructor(public navCtrl: NavController, public lookProvider: LookProvider) {
    // this.looks = [];
    // this.LookList$ = this.lookProvider
    // .getLookByBrands('aaaa') // gets DB list
    // .snapshotChanges() // key and value
    // .map(
    //   changes => {
    //     return changes.map(c => ({
    //       key: c.payload.key, ... c.payload.val()
    //     }))
    //   }
    // )

    this.LookList$ = this.lookProvider
    .getLookList() // gets DB list
    .snapshotChanges() // key and value
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ... c.payload.val()
        }))
      }
    )

  }


  editLook(look){
    console.log(look);
    this.navCtrl.setRoot("EditLook",{look: look});


  }
  

}
