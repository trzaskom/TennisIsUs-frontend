import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    location = {
        'latitude': 0,
        'longitude': 0
    };

    constructor(private http: HttpClient) {
    }

    postInitialGeolocation(location) {
        this.location.latitude = location.coords.latitude;
        this.location.longitude = location.coords.longitude;
        console.log(this.location.latitude);
        console.log(this.location.longitude);
        this.http.post(`${environment.serverURL}/geolocation`, this.location).subscribe();
    }

    updateLocation(location) {
        this.location.latitude = location.coords.latitude;
        this.location.longitude = location.coords.longitude;
        console.log(this.location.latitude);
        console.log(this.location.longitude);
        this.http.put(`${environment.serverURL}/geolocation`, this.location).subscribe();
    }

}
