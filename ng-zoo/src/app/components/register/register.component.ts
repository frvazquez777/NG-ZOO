import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit {

    public titulo: string;
    public user: User;
    public message: string;
    public status: boolean;
    public error: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.titulo = 'Registro';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
        this.status = false;
        this.error = false;
    }

    ngOnInit() {
        console.log('Registro');
    }

    onSubmit(registerForm) {
        console.log(this.user);
        this._userService.register(this.user).subscribe(
            response => {
                console.log("response");
                console.log(response);
                if (response.user && response.user._id) {
                    if (response.user != null) {
                        this.user = response.user;
                        this.message = 'El registro se ha realizado correctamente';
                        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                        registerForm.reset();
                        this.status = true;
                        this.error = false;
                    } else {
                        this.message = response.message;
                        this.status = false;        
                        this.error = true;
                    }

                } else {
                    this.message = response.message;
                    this.status = false; 
                    this.error = true;
                }
            }, error => {
                console.log(<any>error);
            }
        );
    }

}
