import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';

@Component({
    selector: 'app-about',
    templateUrl: 'about.page.html',
    styleUrls: ['about.page.scss']
})
export class AboutPage {

/*    constructor(private geolocation: Geolocation) {
        this.getLocation();
    }


    getLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            const location = 'lat ' + resp.coords.latitude + ' lang ' + resp.coords.longitude;
        });

    }*/
}
