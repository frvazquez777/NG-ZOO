import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user.edit.component.html',
  providers: [UserService, UploadService]
})

export class UserEditComponent implements OnInit {

  public titulo: string;
  public user: User;
  public status: boolean;
  public statusError: boolean;
  public message: string;
  public filesToUpload: Array<File>;
  public url: String;
  public identity;
  public token;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.titulo = 'Actualizar Datos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.status = false;
    this.statusError = false;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Iniciando Modificacion de Datos');
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.statusError = true;
          this.status = false;
          this.message = 'Lo sentimos, no se ha podido realizar la actualización de datos.';
        } else {
          this.statusError = false;
          this.status = true;
          this.message = 'Se actualizaco correctamente los datos';
          //Carga en localstorage
          localStorage.setItem('identity', JSON.stringify(this.user));

          // carga de imagen
          this._uploadService.makeFileRequest(this.url + '/upload-image/' + this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.user.image = result.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
            });
        }
      }, error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.statusError = true;
          this.status = false;
          this.message = 'Error del servidor';
        }
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

