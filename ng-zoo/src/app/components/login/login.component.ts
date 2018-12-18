import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {

    public titulo: string;
    public user: User;
    public message: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.titulo = 'Login';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit() {
        console.log('login');
    }

    onSubmit(loginForm) {
        console.log(this.user);
        //loging del usuario
        this._userService.signup(this.user).subscribe(
            response => {
                if (response.issetUser) {
                    this.identity = response.issetUser;
                    if (!this.identity || !this.identity._id) {
                        this.message = 'El usuario no se a logueado correactamente';
                    } else {
                        this.identity.password = null;

                        localStorage.setItem('identity', JSON.stringify(this.identity));

                        //conseguir el token
                        this._userService.signup(this.user, 'true').subscribe(
                            response => {
                                console.log(response);
                                if (response.token) {
                                    this.token = response.token;
                                    if (this.token.length <= 0) {
                                        console.log('Token No Generado');
                                    } else {
                                        this.message = null;
                                        localStorage.setItem('token', this.token);
                                        //redigir a home
                                        this._router.navigate(['/']);
                                    }
                                } else {
                                    this.message = response.message;
                                }
                            }, error => {
                                console.log(<any>error);
                                this.message = error.error.message;
                            }
                        );
                    }
                } else {
                    this.message = response.message;
                }
            }, error => {
                console.log(<any>error);
                this.message = error.error.message;
            }
        );
    }
}
