import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
// @ts-ignore
import {UserSearchDTO} from '../../model/UserSearchDTO';
import {User} from '../../model/User';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    searchedPlayers: UserSearchDTO[];
    detailedPlayer: UserSearchDTO;

    constructor(public http: HttpClient) {
    }

    getSearchedPlayers(maxRange: string, minRating: string, maxRating: string, minAge: string, maxAge: string, gender: string) {

        const params = new HttpParams().set('maxRange', maxRange).set('minRating', minRating).set('maxRating', maxRating)
            .set('minAge', minAge).set('maxAge', maxAge).set('gender', gender);

        return this.http.get(`${environment.serverURL}/search`, {params: params}).pipe(tap(
            response => {
                this.searchedPlayers = <UserSearchDTO[]>response;
            }
        ));

    }

}
