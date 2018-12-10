import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, DoCheck {

  public titulo = 'NG-ZOO';
  public emailContacto: string;

  ngOnInit() {
    this.emailContacto = localStorage.getItem('emailContacto');
  }

  ngDoCheck() {
    this.emailContacto = localStorage.getItem('emailContacto');
  }

  borrarEmail() {
    localStorage.removeItem('emailContacto');
    localStorage.clear();
    this.emailContacto = null;
  }
}
