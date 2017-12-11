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

  addLook(look: Look){
      return this.lookList.push(look);
  }

  editLook(look: Look){
      return this.lookList.update(look.key, look);
  }

}
