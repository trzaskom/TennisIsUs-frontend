import {Component, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../client/auth/auth.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

    @ViewChild('username')
    usernameModel: NgModel;

    constructor(private readonly navCtrl: NavController,
                private readonly authService: AuthService,
                private readonly loadingCtrl: LoadingController,
                private readonly toastCtrl: ToastController) {
    }

    async signup(value: any) {
        const loading = await this.loadingCtrl.create({
            spinner: 'bubbles',
            message: 'Signing up ...'
        });

        await loading.present();

        this.authService
            .signup(value)
            .pipe(finalize(() => loading.dismiss()))
            .subscribe(
                jwt => this.showSuccesToast(jwt),
                err => this.handleError(err));
    }

    async handleError(error: any) {
        const message = 'Unexpected error occurred';

        const toast = await this.toastCtrl.create({
            message,
            duration: 5000,
            position: 'bottom'
        });

        await toast.present();
    }

    private async showSuccesToast(jwt) {
        if (jwt !== 'EXISTS') {
            const toast = await this.toastCtrl.create({
                message: 'Sign up successful',
                duration: 3000,
                position: 'bottom'
            });

            await toast.present();
            this.navCtrl.navigateRoot(['home'], true, {replaceUrl: true});
        } else {
            const toast = await this.toastCtrl.create({
                message: 'Username already registered',
                duration: 3000,
                position: 'bottom'
            });

            await toast.present();

            this.usernameModel.control.setErrors({'usernameTaken': true});
        }
    }


}