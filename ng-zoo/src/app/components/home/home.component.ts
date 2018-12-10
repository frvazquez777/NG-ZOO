import { Component, OnInit } from '@angular/core';
import { fundido, rotacion } from '../animation';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
    animations: [rotacion]
})
export class HomeComponent implements OnInit {
    public titulo: string;
    public descripcion: string;

    constructor() {
        this.titulo = 'Bienvenido a NG-ZOO';
        this.descripcion = 'Disfruta de los ANIMALES mas exoticos de nuestro zoologico';
    }

    ngOnInit() {
        console.log('Home Component Cargado');
    }
}