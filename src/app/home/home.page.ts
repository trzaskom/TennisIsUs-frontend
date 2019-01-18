import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../client/auth/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    user: string;
    message: string;

    constructor(private readonly authService: AuthService,
                jwtHelper: JwtHelperService,
                private readonly httpClient: HttpClient) {

        this.authService.authUserObservable.subscribe(jwt => {
            if (jwt) {
                const decoded = jwtHelper.decodeToken(jwt);
                this.user = decoded.sub;
            } else {
                this.user = null;
            }
        });

    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

}
