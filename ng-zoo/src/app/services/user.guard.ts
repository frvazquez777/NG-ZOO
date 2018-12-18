import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userService: UserService
    ) {

    }

    canActivate() {
        var identity = this._userService.getIdentity();

        if (!identity) {
            return true;
        } else {
            this._router.navigate(['/']);
            return false;
        }
    }
}
