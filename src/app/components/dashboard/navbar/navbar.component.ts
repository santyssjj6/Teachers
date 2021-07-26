import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MeService } from 'src/app/services/auth/me.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  routes: Menu[] = [];
  userName: any;

  constructor(
    private _menuService: MenuService,
    private _meService: MeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.setUserLogged();
  }

  loadMenu() {
    this._menuService.getMenu().subscribe((data) => {
      this.routes = data;
    });
  }

  setUserLogged() {
    let token = localStorage.token;
    this._meService.teacherMe(token).subscribe((data) => {
      this.userName = data.user.userName;
      console.log(data);
      console.log(this.userName);
    });
  }

  logout() {
    this.router.navigate(['logout']);
    localStorage.clear();
  }
}
