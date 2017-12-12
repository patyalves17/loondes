import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AddLook } from '../add-look/add-look';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab2Root = "AddLook";
  tab1Root = HomePage;
  

  constructor() {

  }
}
