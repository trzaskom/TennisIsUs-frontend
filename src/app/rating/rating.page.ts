import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.page.html',
    styleUrls: ['./rating.page.scss'],
})
export class RatingPage {

    forehand;
    backhand;
    movement;
    firstServe;
    secondServe;
    returnOfServe;
    volleys;
    rating;

    constructor(private readonly navCtrl: NavController, public http: HttpClient, public authService: AuthService) {
    }

    updateRating() {
        this.rating = (+this.forehand + +this.backhand + +this.movement + +this.firstServe + +this.secondServe
            + +this.returnOfServe + +this.volleys) / 7;
        console.log(this.rating);
        this.http.put(`${environment.serverURL}/rating`, this.rating).subscribe();
        this.navCtrl.navigateRoot([''], true, {replaceUrl: true});
    }


}
