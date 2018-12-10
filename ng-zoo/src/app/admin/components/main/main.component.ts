import { Component } from '@angular/core';

@Component({
    selector: 'admin-main',
    templateUrl: './main.component.html'
})
export class MainComponent {

    public titulo: string;

    constructor() {
        this.titulo = 'Panel de Administración';
    }

}
