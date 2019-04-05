import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {SearchService} from '../../client/api/search/search.service';
// @ts-ignore
import {UserSearchDTO} from '../../client/model/UserSearchDTO';
import {User} from '../../client/model/User';
import {Observable} from 'rxjs/Rx';
import {MessagesService} from '../messages/messages.service';

declare var google;
let map: any;
let infoWindow: any;
let directionsService: any;
let directionsDisplay: any;
let bounds: any;

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
                jwtHelper: JwtHelperService, private geolocationService: GeolocationService, public searchService: SearchService,
                public messagesService: MessagesService) {

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
        navigator.geolocation.watchPosition(changedLocation => this.geolocationService.updateLocation(changedLocation));

        this.minRating = this.initialMin / 10;
        this.maxRating = this.initialMax / 10;
    }

    initMap() {
        const currentLocIconURL = 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png';
        const searchedPlayerIconURL = 'http://maps.google.com/mapfiles/ms/micons/golfer.png';
        navigator.geolocation.getCurrentPosition((location) => {
            console.log(location);
            map = new google.maps.Map(this.mapElement.nativeElement, {
                center: {lat: location.coords.latitude, lng: location.coords.longitude},
            });

            this.addMarker(location.coords.latitude, location.coords.longitude, 'Your current position', currentLocIconURL);
            this.addMarker(this.detailedUser.searchedLatitude, this.detailedUser.searchedLongitude,
                this.detailedUser.name + ' ' + this.detailedUser.surname, searchedPlayerIconURL);

            bounds = new google.maps.LatLngBounds();
            bounds.extend(new google.maps.LatLng(location.coords.latitude, location.coords.longitude));
            bounds.extend(new google.maps.LatLng(this.detailedUser.searchedLatitude, this.detailedUser.searchedLongitude));

            /*            directionsService = new google.maps.DirectionsService;
                        directionsDisplay = new google.maps.DirectionsRenderer({
                            suppressMarkers: true
                        });
                        directionsDisplay.setMap(map);
                        directionsService.route({
                            origin: {lat: location.coords.latitude, lng: location.coords.longitude},
                            destination: {lat: this.detailedUser.searchedLatitude, lng: this.detailedUser.searchedLongitude},
                            travelMode: 'DRIVING'
                        }, (response, status) => {
                            if (status === 'OK') {
                                directionsDisplay.setDirections(response);
                            }
                        });*/
            this.mapElement.nativeElement.hidden = true;
        });
    }

    addMarker(latitude, longitude, content, iconURL) {

        const marker = new google.maps.Marker({
            map: map,
            icon: new google.maps.MarkerImage(
                // URL
                iconURL,
                // (width,height)
                new google.maps.Size(44, 32),
                // The origin point (x,y)
                new google.maps.Point(0, 0),
                // The anchor point (x,y)
                new google.maps.Point(22, 32)
            ),
            animation: google.maps.Animation.DROP,
            position: {lat: latitude, lng: longitude}
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(content);
            infoWindow.open(map, this);
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
        console.log(this.detailsSwitch);
        if (this.detailsSwitch === 'map') {
            this.mapElement.nativeElement.hidden = false;
            map.fitBounds(bounds);
        } else {
            this.mapElement.nativeElement.hidden = true;
        }
    }

    goBackToResultList() {
        this.detailsSwitch = 'details';
        this.searchDetails = false;
    }

    addToFriends() {
        this.messagesService.addToFriends(this.detailedUser);
    }
}
