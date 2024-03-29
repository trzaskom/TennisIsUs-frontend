import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {User} from '../../client/model/User';
import {SocketService} from '../../client/socket/socket.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly jwtTokenName = 'jwt_token';

    private authUser = new ReplaySubject<any>(1);
    public authUserObservable = this.authUser.asObservable();
    loggedUser: User;

    constructor(private readonly httpClient: HttpClient,
                private readonly navCtrl: NavController,
                private readonly jwtHelper: JwtHelperService,
                private readonly socketService: SocketService) {
    }

    public whoAmI(): User {
        return this.loggedUser;
    }

    getCurrentUser() {
        return this.httpClient.get(`${environment.serverURL}/currentUser`)
            .pipe(
                tap(data => this.loggedUser = <User>data)
            );
    }

    hasAccess(): Promise<boolean> {
        const jwt = localStorage.getItem(this.jwtTokenName);

        if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {

            return new Promise((resolve, _) => {

            this.httpClient.get(`${environment.serverURL}/authenticate`)
                .subscribe(() => {
                        this.authUser.next(jwt);
                        resolve(true);
                    },
                    err => {
                        this.logout();
                        resolve(false);
                    });
        });
        } else {
            this.logout();
            return Promise.resolve(false);
        }
    }

    login(values: any): Observable<string> {
        return this.httpClient.post(`${environment.serverURL}/login`, values, {responseType: 'text'})
            .pipe(tap(jwt => this.handleJwtResponse(jwt)));
    }

    logout() {
        this.socketService.disconnect();
        localStorage.removeItem(this.jwtTokenName);
        this.authUser.next(null);
        this.navCtrl.navigateRoot('login', true, {replaceUrl: true, skipLocationChange: true});
    }

    signup(values: any): Observable<string> {
        return this.httpClient.post(`${environment.serverURL}/signup`, values, {responseType: 'text'})
            .pipe(tap(jwt => {
                if (jwt !== 'EXISTS') {
                    return this.handleJwtResponse(jwt);
                }
                return jwt;
            }));
    }

    private handleJwtResponse(jwt: string): string {
        localStorage.setItem(this.jwtTokenName, jwt);
        this.authUser.next(jwt);

        return jwt;
    }
}
