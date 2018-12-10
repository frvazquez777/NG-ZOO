import { Component, OnInit } from '@angular/core';
import { fundido } from '../animation';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    animations: [fundido]
})
export class ContactComponent implements OnInit {
    public titulo: string;
    public emailContacto: string;

    constructor() {
        this.titulo = 'Contactos';
    }

    ngOnInit() {
        console.log('Contact Component Cargado');
    }

    
}
