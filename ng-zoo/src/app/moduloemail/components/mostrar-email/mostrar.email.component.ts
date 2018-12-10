import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'mostrar-email',
    templateUrl: './mostrar.email.component.html'
})
export class MostrarEmailComponent implements OnInit, DoCheck {

    public titulo: string;
    public emailContacto: string;

    constructor() {
        this.titulo = 'Mostrar Email';
    }

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
