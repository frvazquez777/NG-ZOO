import { Component } from '@angular/core';

@Component({
    selector: 'admin-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.styl']
})
export class ListComponent {

    public titulo: string;
    public numbers: Array<any>;
    constructor() {
        this.titulo = 'Lista';
        this.numbers = new Array(7);
    }

}
