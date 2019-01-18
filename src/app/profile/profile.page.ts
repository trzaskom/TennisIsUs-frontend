import {Component, OnInit} from '@angular/core';
import {RestService} from '../../client/api/rest.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../client/auth/auth.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

    loggedUser;

    constructor(private readonly navCtrl: NavController, public authService: AuthService) {
        this.getUserDetails();
    }

    getUserDetails() {
        this.authService.getCurrentUser().subscribe(() => {
            this.loggedUser = this.authService.loggedUser;
        });
    }

    updateRating() {
        this.navCtrl.navigateRoot(['rating'], true, {replaceUrl: true});
    }


}
