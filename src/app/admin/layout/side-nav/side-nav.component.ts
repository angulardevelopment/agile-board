import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildRoute, childRoutes } from 'src/app/child-routes';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showMenu = false;
  routes: ChildRoute[] = childRoutes;
  constructor(private readonly router: Router) {}


  ngOnInit() {}

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }
}
