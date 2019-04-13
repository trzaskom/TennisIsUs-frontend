import {Component, ElementRef, ViewChild} from '@angular/core';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
    selector: 'app-courts',
    templateUrl: './courts.page.html',
    styleUrls: ['./courts.page.scss'],
})
export class CourtsPage {

    currentLatitude: string;
    currentLongitude: string;
    src: SafeResourceUrl;

    constructor(private readonly geolocationService: GeolocationService, public sanitizer: DomSanitizer) {
        this.currentLatitude = String(this.geolocationService.location.latitude);
        this.currentLongitude = String(this.geolocationService.location.longitude);
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?q=tennis%20court&center='
            + this.currentLatitude + ',' + this.currentLongitude + '&zoom=11&key=AIzaSyA_QJ_mWom7l1gCpsIHwnGm4hKnIa5kAXg');
    }

}
