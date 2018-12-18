import { Component } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.styl']
})
export class ErrorComponent {
    public titulo: string;
    public message: string;

    constructor() {
        this.titulo = 'Error 404!';
        this.message = 'PÁGINA NO ENCONTRADA';
    }

}