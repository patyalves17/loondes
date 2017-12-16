import { Injectable } from '@angular/core';
import { Look } from '../models/Look';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the LookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LookProvider {

  private lookList = this.db.list<Look>
  ('look-list');

  constructor(private db: AngularFireDatabase){

  }

  getLookList(){
      return this.lookList;
  }
  getLookByUser(uID: string){
      let looks = this.db.list('/look-list',ref => ref.orderByChild('uId').equalTo(uID));
      console.log(looks);
    return looks;
}

  addLook(look: Look){
      return this.lookList.push(look);
  }

  editLook(look: Look){
      return this.lookList.update(look.key, look);
  }

}
