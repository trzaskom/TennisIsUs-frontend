import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
/*import {User} from '../model/User';*/

@Injectable({
    providedIn: 'root'
})
export class RestService {

    public API = 'http://localhost:8080';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };

    constructor(public http: HttpClient) {
    }

    getUsers(): Observable<any> {
        return this.http.get(this.API + '/users');
    }

    createTestUser(user: any): Observable<any> {
        console.log('rest entry');
        return this.http.post(this.API + '/users', user, this.httpOptions);
    }

}
