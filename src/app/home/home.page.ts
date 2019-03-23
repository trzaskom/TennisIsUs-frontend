import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {SearchService} from '../../client/api/search/search.service';
import {UserSearchDTO} from '../../client/model/UserSearchDTO';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {

    searchListView = false;
    searchDetails = false;
    detailsSwitch = 'details';
    detailedUser: UserSearchDTO;
    user: string;
    message: string;
    searchRating: any;
    initialMin = 10;
    initialMax = 80;
    minRating: any;
    maxRating: any;
    maxRange: any;

    constructor(private readonly authService: AuthService,
                jwtHelper: JwtHelperService, private geolocationService: GeolocationService, public searchService: SearchService) {

        this.authService.authUserObservable.subscribe(jwt => {
            if (jwt) {
                const decoded = jwtHelper.decodeToken(jwt);
                this.user = decoded.sub;
            } else {
                this.user = null;
            }
        });
/*        this.updateLocation();
        Observable.interval(5 * 60 * 1000).subscribe(() => {
            this.updateLocation();
        });*/
        this.minRating = this.initialMin / 10;
        this.maxRating = this.initialMax / 10;
    }

    updateLocation() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.geolocationService.updateLocation(location);
        });
    }


    logout() {
        this.authService.logout();
    }

    setDualBadge(search_rating) {
        this.minRating = search_rating.lower / 10;
        this.maxRating = search_rating.upper / 10;
    }

    searchForPlayers() {
        this.searchService.getSearchedPlayers(this.minRating, this.maxRating, this.maxRange);
        this.searchListView = true;
    }

    backToSearchPanel() {
        this.searchListView = false;
    }

    foundPlayerDetails(user: UserSearchDTO) {
        this.detailedUser = user;
        this.searchDetails = true;
    }

    segmentChanged(ev: any) {
        this.detailsSwitch = ev.detail.value;
    }

    goBackToResultList() {
        this.searchDetails = false;
    }

}
