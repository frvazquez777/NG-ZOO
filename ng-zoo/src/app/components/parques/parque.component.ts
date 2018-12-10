import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
    selector: 'parque',
    templateUrl: './parque.component.html',
    styleUrls: ['./estilos.styl']
})
export class ParqueComponent implements OnChanges, OnInit, DoCheck, OnDestroy {

    @Input() nombre: string;
    @Input('metros_cuadrados') metros: number;

    @Output() pasameLosDatos = new EventEmitter();

    public titulo: string;
    public vegetacion: string;
    public abierto: boolean;

    constructor() {
        this.titulo = 'Parques de México';
        this.nombre = 'Parque Natural para caballos';
        this.vegetacion = 'Alta';
        this.metros = 450;
        this.abierto = true;
    }

    ngOnInit() {
        console.log('OnInit cargado');
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('OnChanges cargado');
    }

    ngDoCheck() {
        console.log('DoCheck cargado');
    }

    ngOnDestroy() {
        console.log('OnDestroy Cargado');
    }

    emitirEvento() {
        this.pasameLosDatos.emit({
            'nombre': this.nombre,
            'vegetacion': this.vegetacion,
            'metros': this.metros,
            'abierto': this.abierto
        });
    }
}