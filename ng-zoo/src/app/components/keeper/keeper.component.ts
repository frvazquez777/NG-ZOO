import { Component, OnInit } from '@angular/core';
import { fundido } from '../animation';

@Component({
    selector: 'keeper',
    templateUrl: './keeper.component.html',
    animations: [fundido]
})
export class KeeperComponent implements OnInit {
    public titulo: string;

    constructor() {
        this.titulo = 'Cuidadores';
    }

    ngOnInit() {
        console.log('Keeper Component Cargado');
    }
}