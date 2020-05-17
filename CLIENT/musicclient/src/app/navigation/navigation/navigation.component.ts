import { Component, OnInit } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home'},
      {label: 'Login/Logout', icon: 'pi pi-fw pi-user', routerLink:'login'},
      {label: 'CRUD', icon: 'pi pi-fw pi-user', routerLink:'crud'}

  ];
  }

}
