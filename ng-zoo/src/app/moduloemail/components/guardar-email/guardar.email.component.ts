import { Component } from '@angular/core';

@Component({
    selector: 'guardar-email',
    templateUrl: './guardar.email.component.html'
})
export class GuardarEmailComponent {

    public titulo: string;
    public emailContacto: string;

    constructor() {
        this.titulo = 'Guardar Email';
        this.emailContacto = localStorage.getItem('emailContacto');
    }

    guardarEmail() {
        console.log(this.emailContacto);
        if (this.emailContacto != null) {
            localStorage.setItem('emailContacto', this.emailContacto);
            console.log(localStorage.getItem('emailContacto'));
        }
        this.emailContacto = null;
    }

}
