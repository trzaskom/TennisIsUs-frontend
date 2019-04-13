import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../client/socket/socket.service';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {SearchService} from '../../client/api/search/search.service';
import {NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.page.html',
    styleUrls: ['./search-form.page.scss'],
})
export class SearchFormPage implements OnInit {

    searchRating: any;
    searchAge: any;
    searchGender = 3;
    minRating = 1;
    maxRating = 1;
    minAge = 16;
    maxAge = 16;
    maxRange = 1;

    constructor(private readonly socketService: SocketService, private readonly geolocationService: GeolocationService,
                private readonly searchService: SearchService, private readonly navCtrl: NavController) {
        this.checkSocketConnection();
        navigator.geolocation.watchPosition(changedLocation => this.geolocationService.updateLocation(changedLocation));
    }

    ngOnInit() {
    }

    checkSocketConnection() {
        if (this.socketService.stompClient == null) {
            this.socketService.initializeWebSocketConnection();
        }
    }

    setDualBadgeRating(search_rating) {
        this.minRating = search_rating.lower / 10;
        this.maxRating = search_rating.upper / 10;
    }

    setDualBadgeAge(search_age) {
        this.minAge = search_age.lower;
        this.maxAge = search_age.upper;
    }

    searchForPlayers() {
        this.searchService.getSearchedPlayers(String(this.maxRange), String(this.minRating), String(this.maxRating),
            String(this.minAge), String(this.maxAge), String(this.searchGender)).subscribe(_ => {
            this.navCtrl.navigateRoot('search-results');
        });
    }

}
