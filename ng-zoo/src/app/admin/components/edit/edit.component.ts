import { Component } from '@angular/core';

@Component({
    selector: 'admin-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent {

    public titulo: string;

    constructor() {
        this.titulo = 'Editar';
    }

}
