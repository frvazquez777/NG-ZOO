import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';

import { GLOBAL } from '../../../services/global';

import { fadeLateral } from '../../animation';

@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  animations: [fadeLateral],
  providers: [UserService, AnimalService, UploadService]
})
export class AddComponent implements OnInit {

  public titulo: string;
  public url: string;
  public message: string;
  public status: boolean;
  public error: boolean;
  public animal: Animal;
  public identity;
  public token;
  public filesToUpload;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.titulo = 'Añadir';
    this.url = GLOBAL.url;
    this.animal = new Animal(null, '', '', 2018, '', '');
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
  }

  ngOnInit() {
    console.log('Carga de componente animal.');
  }

  onSubmit(formAdd) {
    console.log(this.animal);
    this._animalService.addAnimal(this.token, this.animal).subscribe(
      response => {
        if (response.animal != null) {
          this.animal = response.animal;
          this.message = 'El registro se ha realizado correctamente';

          //reset formulario
          // formAdd.reset();
          // this.status = true;
          // this.error = false;
          console.log(this.filesToUpload);

          //subir la imagen
          if (!this.filesToUpload) {
            this._router.navigate(['/admin-panel/listado']);

          } else {
            this._uploadService.makeFileRequest(this.url + '/upload-animal/' + this.animal._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                this.animal.image = result.image;
                console.log(this.animal);
                this._router.navigate(['/admin-panel/listado']);

              });
          }
          this.animal = new Animal(null, '', '', 2018, '', '');
          this.status = false;
          this.error = false;
        } else {
          this.message = response.message;
          this.status = false;
          this.error = true;
        }
      }, error => {
        this.error = true;
        this.status = false;
        this.message = 'Error en el servidor';
        // console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
