import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Look } from '../../models/Look';
import { LookProvider } from '../../providers/look-provider';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  LookList$: Observable<Look[]>;
  look: Look;

  constructor(public navCtrl: NavController, public lookProvider: LookProvider,) {
    // this.looks = [];
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
  

}
