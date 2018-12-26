import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    public API = 'http://192.168.43.100:8080';

    constructor(public http: HttpClient) {
    }

    getUsers(): Observable<any> {
        return this.http.get(this.API + '/users');
    }

}
