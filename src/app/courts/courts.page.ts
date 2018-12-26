import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GoogleMaps, GoogleMap} from '@ionic-native/google-maps';
import {NavController, Platform} from '@ionic/angular';

declare var google;
let map: any;
let infoWindow: any;

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

@Component({
    selector: 'app-courts',
    templateUrl: './courts.page.html',
    styleUrls: ['./courts.page.scss'],
})
export class CourtsPage implements AfterViewInit {
    @ViewChild('map') mapElement: ElementRef;

    constructor() {
    }

    ngAfterViewInit() {
        this.initMap();
    }

    initMap() {
        navigator.geolocation.getCurrentPosition((location) => {
            console.log(location);
            map = new google.maps.Map(this.mapElement.nativeElement, {
                center: {lat: location.coords.latitude, lng: location.coords.longitude},
                zoom: 15
            });
        });
    }
/*            infoWindow = new google.maps.InfoWindow();
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: {lat: location.coords.latitude, lng: location.coords.longitude},
                radius: 1000,
                type: ['store']
            }, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        this.createMarker(results[i]);
                    }
                }
            });
        }, (error) => {
            console.log(error);
        }, options);
        const myplace = {lat: -33.8665, lng: 151.1956};
    }

    createMarker(place) {
        const placeLoc = place.geometry.location;
        const marker = new google.maps.Marker({
            map: map,
            position: placeLoc
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(place.name);
            infoWindow.open(map, this);
        });
    }*/
}
