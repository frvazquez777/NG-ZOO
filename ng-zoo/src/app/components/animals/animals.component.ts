import { Component, OnInit } from '@angular/core';
import { fundido } from '../animation';

@Component({
    selector: 'animals',
    templateUrl: './animals.component.html',
    styleUrls: ['./estilos.styl'],
    animations: [fundido]
})
export class AnimalsComponent implements OnInit {
    public titulo: string;

    constructor() {
        this.titulo = 'Animales';
    }

    ngOnInit() {
        console.log('Contacto Component Cargado');
    }
}