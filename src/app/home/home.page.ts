import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {SearchService} from '../../client/api/search/search.service';
import {UserSearchDTO} from '../../client/model/UserSearchDTO';
import {User} from '../../client/model/User';

declare var google;
let map: any;
let infoWindow: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    @ViewChild('map') mapElement: ElementRef;

    searchListView = false;
    searchDetails = false;
    detailsSwitch = 'details';
    detailedUser: UserSearchDTO;
    user: string;
    loggedUsersDetails: User;
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
        this.authService.getCurrentUser().subscribe(() => {
                this.loggedUsersDetails = this.authService.whoAmI();
            }
        );
        /*        this.updateLocation();
                Observable.interval(5 * 60 * 1000).subscribe(() => {
                    this.updateLocation();
                });*/
        this.minRating = this.initialMin / 10;
        this.maxRating = this.initialMax / 10;
    }

    initMap() {
        navigator.geolocation.getCurrentPosition((location) => {
            console.log(location);
            map = new google.maps.Map(this.mapElement.nativeElement, {
                center: {lat: location.coords.latitude, lng: location.coords.longitude},
                zoom: 15,
            });
            this.addMarker(location.coords.latitude, location.coords.longitude, 'Your current position');
            this.addMarker(this.detailedUser.searchedLatitude, this.detailedUser.searchedLongitude,
                this.detailedUser.name + ' ' + this.detailedUser.surname);
            this.mapElement.nativeElement.hidden = true;
        });
    }

    addMarker(latitude, longitude, content) {

        console.log(latitude);
        console.log(longitude);
        const marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: {lat: latitude, lng: longitude}
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(content);
            infoWindow.open(map, this);
        });
    }

    updateLocation() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.geolocationService.updateLocation(location);
        });
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
        this.initMap();
    }

    segmentChanged(ev: any) {
        this.detailsSwitch = ev.detail.value;
        if (this.detailsSwitch === 'map') {
            this.mapElement.nativeElement.hidden = false;
        } else {
            this.mapElement.nativeElement.hidden = true;

        }
    }

    goBackToResultList() {
        this.searchDetails = false;
    }

}
