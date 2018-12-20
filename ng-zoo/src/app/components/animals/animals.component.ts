import { Component, OnInit } from '@angular/core';
import { fundido } from '../animation';

import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./estilos.styl'],
  providers: [AnimalService],
  animations: [fundido]
})
export class AnimalsComponent implements OnInit {
  public titulo: string;
  public animals: Animal[];
  public url: string;

  constructor(
    private _animalService: AnimalService
  ) {
    this.titulo = 'Animales';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Contacto Component Cargado');
    this.getAnimals();
  }

  getAnimals() {
    this._animalService.getAnimals().subscribe(
      response => {
        console.log(response);
        if (!response.animals) {
          console.log('Error de petición');
        } else {
          this.animals = response.animals;
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

}
