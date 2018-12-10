import { Component } from '@angular/core';

@Component({
    selector: 'main-email',
    templateUrl: './main.email.component.html'
})
export class MainEmailComponent {

    public titulo: string;

    constructor() {
        this.titulo = 'Modulo de Email';
    }

}
