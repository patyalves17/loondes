import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sigup } from './sigup';

@NgModule({
  declarations: [
    Sigup,
  ],
  imports: [
    IonicPageModule.forChild(Sigup),
  ],
})
export class SigupModule {}
