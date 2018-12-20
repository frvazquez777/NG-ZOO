import { Component, OnInit } from '@angular/core';
import { fundido } from '../animation';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'keeper',
  templateUrl: './keeper.component.html',
  styleUrls: ['./estilos.styl'],
  providers: [UserService],
  animations: [fundido]
})
export class KeeperComponent implements OnInit {
  public titulo: string;
  public keepers: User[];
  public url: string;

  constructor(
    private _userService: UserService
  ) {
    this.titulo = 'Cuidadores';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Keeper Component Cargado');
    this.getKeeper();
  }

  getKeeper() {
    this._userService.getKeeper().subscribe(
      response => {
        // console.log(response);
        if (!response.keepers) {
          console.log('Error de petición');
        } else {
          this.keepers = response.keepers;
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

}
