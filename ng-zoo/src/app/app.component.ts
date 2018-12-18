import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {

  public titulo: string;
  public emailContacto: string;
  public url: string;
  public identity;
  public loading;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.titulo = 'NG-ZOO';
    this.loading = false;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.emailContacto = localStorage.getItem('emailContacto');
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.emailContacto = localStorage.getItem('emailContacto');
    this.identity = this._userService.getIdentity();
  }

  borrarEmail() {
    localStorage.removeItem('emailContacto');
    localStorage.clear();
    this.emailContacto = null;
  }

  logout() {
    this.loading = true;
    console.log('nueva carga 1');
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
    this.loading = false;
    console.log('nueva carga 2');
  }

}
