import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {User} from '../../client/model/User';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

    loggedUser: User;

    constructor(private readonly navCtrl: NavController, public authService: AuthService) {
        this.authService.getCurrentUser().subscribe(() => {
                this.loggedUser = this.authService.whoAmI();
            }
        );
    }

    updateRating() {
        this.navCtrl.navigateRoot(['rating'], true, {replaceUrl: true});
    }

    logout() {
        this.authService.logout();
    }

}
