import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
// @ts-ignore
import {UserSearchDTO} from '../../model/UserSearchDTO';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    searchedPlayers: UserSearchDTO[];

    constructor(public http: HttpClient) {
    }

    getSearchedPlayers(minRating: string, maxRating: string, maxRange: string) {

        const params = new HttpParams().set('minRating', minRating).set('maxRating', maxRating).set('maxRange', maxRange);

        return this.http.get(`${environment.serverURL}/search`, {params: params}).subscribe
        (
            response => {
                this.searchedPlayers = <UserSearchDTO[]>response;
                console.log(this.searchedPlayers);
            }
        );
    }

}
