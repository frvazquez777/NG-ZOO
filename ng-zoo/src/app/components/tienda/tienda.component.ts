import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fundido } from '../animation';

//declare var jquery: any;
import * as $ from 'jquery';
declare var $: any;

@Component({
    selector: 'tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./estilos.styl'],
    animations: [
        trigger('marcar', [
            state('inactive', style({
                border: '5px solid #ccc'
            })),
            state('active', style({
                border: '5px solid yellow',
                background: 'red',
                borderRadius: '50px'
            })),
            transition('inactive => active', animate('7s')),
            transition('active => inaxtive', animate('7s'))
        ]),
        fundido
    ]
})
export class TiendaComponent implements OnInit {

    public titulo: string;
    public nombreDelParque: string;
    public miParque;
    public status;

    constructor() {
        this.titulo = 'Tienda Online';
        this.status = 'inactive';
    }

    ngOnInit() {
        //uso de jquery
        $('#textojq').hide();
        $('#botonjq').click(function () {
            console.log('click');
            // $('#textojq').removeClass('hidden').fadeIn();
            $('#textojq').slideToggle();
        });

        //uso de jquery dotdotdot
        $('#caja').dotdotdot({});
    }

    mostrarParque() {
        console.log(this.nombreDelParque);
    }

    verDatosParque(event) {
        console.log(event);
        this.miParque = event;
    }

    cambiarEstado(status) {
        if(status == 'inactive') {
            this.status = 'active';
        } else {
            this.status = 'inactive';
        }
    }
}
