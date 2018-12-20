import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';

import { fadeLateral } from '../../animation';

//declare var jquery: any;
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  animations: [fadeLateral],
  providers: [AnimalService]
})
export class ListComponent implements OnInit {

  public titulo: string;
  public numbers: Array<any>;
  public animals: Animal[];
  public token: string;
  public busqueda: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService
  ) {
    this.titulo = 'Lista de Aniamles';
    this.numbers = new Array(7);
    this.token = _userService.getToken();
  }

  ngOnInit() {
    this.getAnimals();
  }

  deleteAnimal(id) {
    $('#myModal-' + id).modal('hide');
    this._animalService.deleteAnimal(this.token, id).subscribe(
      response => {
        if (!response.animal) {
          console.log(response.message);
        } else {
          this.getAnimals();
        }
      }, error => {
        console.log(<any>error);
      }
    );
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
