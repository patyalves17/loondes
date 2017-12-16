import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AddLook } from '../add-look/add-look';
import { Login } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = "AddLook";
  // tab3Root = "Login";
  

  constructor() {

  }
}
