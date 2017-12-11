import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLook } from './add-look';

@NgModule({
  declarations: [
    AddLook,
  ],
  imports: [
    IonicPageModule.forChild(AddLook),
  ],
})
export class AddLookModule {}
