import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../client/api/search/search.service';
// @ts-ignore
import {UserSearchDTO} from '../../client/model/UserSearchDTO';
import {AuthService} from '../auth/auth.service';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {FriendsService} from '../../client/api/friends/friends.service';
import {NavController} from '@ionic/angular';

declare var google;
let map: any;
let infoWindow: any;
let directionsService: any;
let directionsDisplay: any;
let bounds: any;

@Component({
    selector: 'app-search-details',
    templateUrl: './search-details.page.html',
    styleUrls: ['./search-details.page.scss'],
})
export class SearchDetailsPage implements OnInit {
    @ViewChild('map') mapElement: ElementRef;

    detailedPlayer: UserSearchDTO;
    detailsSwitch = 'details';

    constructor(private readonly searchService: SearchService, private readonly authService: AuthService,
                private readonly geolocationService: GeolocationService, private readonly friendsService: FriendsService,
                private readonly navCtrl: NavController) {
        this.detailedPlayer = this.searchService.detailedPlayer;

    }

    ngOnInit() {
        map = new google.maps.Map(this.mapElement.nativeElement, {
            center: {lat: this.geolocationService.location.latitude, lng: this.geolocationService.location.longitude},
        });
        const currentLocIconURL = 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png';
        const searchedPlayerIconURL = 'http://maps.google.com/mapfiles/ms/micons/golfer.png';
        this.addMarker(this.geolocationService.location.latitude, this.geolocationService.location.longitude,
            'Twoja aktualna pozycja', currentLocIconURL);
        this.addMarker(this.detailedPlayer.searchedLatitude, this.detailedPlayer.searchedLongitude,
            this.detailedPlayer.name + ' ' + this.detailedPlayer.surname, searchedPlayerIconURL);

        bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(this.geolocationService.location.latitude, this.geolocationService.location.longitude));
        bounds.extend(new google.maps.LatLng(this.detailedPlayer.searchedLatitude, this.detailedPlayer.searchedLongitude));

        /*directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        directionsDisplay.setMap(map);
        directionsService.route({
            origin: {lat: this.geolocationService.location.latitude, lng: this.geolocationService.location.longitude},
            destination: {lat: this.detailedPlayer.searchedLatitude, lng: this.detailedPlayer.searchedLongitude},
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

    segmentChanged(ev: any) {
        this.detailsSwitch = ev.detail.value;
        if (this.detailsSwitch === 'map') {
            this.mapElement.nativeElement.hidden = false;
            map.fitBounds(bounds);
        } else {
            this.mapElement.nativeElement.hidden = true;
        }
    }

    addToFriends() {
        this.friendsService.addToFriends(this.detailedPlayer.id).subscribe(_ => {
            this.navCtrl.navigateRoot('tabs/(messages:messages)');
        });
    }

}
