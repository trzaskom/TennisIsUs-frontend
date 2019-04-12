import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {SearchService} from '../../client/api/search/search.service';
// @ts-ignore
import {UserSearchDTO} from '../../client/model/UserSearchDTO';
import {User} from '../../client/model/User';
import {FriendsService} from '../../client/api/friends/friends.service';
import {SocketService} from '../../client/socket/socket.service';

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
    searchAge: any;
    searchGender = 3;
    minRating = 1;
    maxRating = 1;
    minAge = 16;
    maxAge = 16;
    maxRange = 1;

    constructor(private readonly authService: AuthService,
                jwtHelper: JwtHelperService, private geolocationService: GeolocationService, public searchService: SearchService,
                private readonly friendsService: FriendsService, private readonly socketService: SocketService) {

        this.authService.authUserObservable.subscribe(jwt => {
            if (jwt) {
                const decoded = jwtHelper.decodeToken(jwt);
                this.user = decoded.sub;
            } else {
                this.user = null;
            }
        });
        this.checkSocketConnection();
        this.authService.getCurrentUser().subscribe(() => {
                this.loggedUsersDetails = this.authService.whoAmI();
            }
        );
        navigator.geolocation.watchPosition(changedLocation => this.geolocationService.updateLocation(changedLocation));
    }

    initMap() {
        map = new google.maps.Map(this.mapElement.nativeElement, {
            center: {lat: this.geolocationService.location.latitude, lng: this.geolocationService.location.longitude},
        });
        const currentLocIconURL = 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png';
        const searchedPlayerIconURL = 'http://maps.google.com/mapfiles/ms/micons/golfer.png';
        this.addMarker(this.geolocationService.location.latitude, this.geolocationService.location.longitude,
            'Twoja aktualna pozycja', currentLocIconURL);
        this.addMarker(this.detailedUser.searchedLatitude, this.detailedUser.searchedLongitude,
            this.detailedUser.name + ' ' + this.detailedUser.surname, searchedPlayerIconURL);

        bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(this.geolocationService.location.latitude, this.geolocationService.location.longitude));
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

    }

    addMarker(latitude, longitude, content, iconURL) {

        const marker = new google.maps.Marker({
            map: map,
            icon: new google.maps.MarkerImage(
                iconURL,
                new google.maps.Size(44, 32),
                new google.maps.Point(0, 0),
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
            String(this.minAge), String(this.maxAge), String(this.searchGender));
        this.searchListView = true;
    }

    backToSearchPanel() {
        this.searchListView = false;
    }

    foundPlayerDetails(user: UserSearchDTO) {
        this.detailedUser = user;
        this.searchDetails = true;

        setTimeout(() => {
            this.initMap();
        }, 50);


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
        this.friendsService.addToFriends(this.detailedUser.id);
    }

    checkSocketConnection() {
        if (this.socketService.stompClient == null) {
            this.socketService.initializeWebSocketConnection();
        }
    }
}
