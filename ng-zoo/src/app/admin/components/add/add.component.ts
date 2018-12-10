import { Component } from '@angular/core';

@Component({
    selector: 'admin-add',
    templateUrl: './add.component.html'
})
export class AddComponent {

    public titulo: string;

    constructor() {
        this.titulo = 'Añadir';
    }

}
