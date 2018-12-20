import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';

import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'admin-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.styl'],
  providers: [UserService, AnimalService, UploadService]
})
export class EditComponent implements OnInit {

  public titulo: string;
  public url: string;
  public message: string;
  public status: boolean;
  public error: boolean;
  public animal: Animal;
  public identity;
  public token;
  public filesToUpload;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.animal = new Animal(null, '', '', 2018, '', '');
    this.is_edit = true;
    this.titulo = 'Editar';
    this.url = GLOBAL.url;
    this.token = _userService.getToken();
  }

  ngOnInit() {
    console.log('Carga de componente animal.');
    this.getAnimal();
  }

  onSubmit(formAdd) {
    console.log(this.animal);
    var id = this.animal._id;
    this._animalService.editAnimal(this.token, id, this.animal).subscribe(
      response => {
        if (response.animal != null) {
          this.animal = response.animal;
          this.message = 'El registro se ha realizado correctamente';

          console.log(this.filesToUpload);

          //subir la imagen
          if (!this.filesToUpload) {
            this._router.navigate(['/animal', this.animal._id]);

          } else {
            this._uploadService.makeFileRequest(this.url + '/upload-animal/' + this.animal._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                this.animal.image = result.image;
                console.log(this.animal);
                this._router.navigate(['/animal', this.animal._id]);

              });
          }

        } else {
          this.message = response.message;
          this.status = false;
          this.error = true;
        }
      }, error => {
        this.error = true;
        this.status = false;
        this.message = 'Error en el servidor';
      }
    );
  }

  getAnimal() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._animalService.getAnimal(id).subscribe(
        response => {
          if (!response.animal) {
            this._router.navigate(['/']);
          } else {
            this.animal = response.animal;
          }

        }, error => {
          console.log(<any>error);
          this.error = true;
          this.status = false;
          this.message = 'Error en el servidor';
        }
      );

    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
