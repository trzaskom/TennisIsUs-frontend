import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {finalize} from 'rxjs/operators';
import {GeolocationService} from '../../client/api/geolocation/geolocation.service';
import {SocketService} from '../../client/socket/socket.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    constructor(private readonly navCtrl: NavController,
                private readonly loadingCtrl: LoadingController,
                private readonly authService: AuthService,
                private readonly toastCtrl: ToastController,
                private readonly socketService: SocketService) {
    }

    signup() {
        this.navCtrl.navigateRoot(['signup']);
    }

    async login(value: any) {
        const loading = await this.loadingCtrl.create({
            spinner: 'bubbles',
            message: 'Logowanie ...'
        });

        loading.present();

        this.authService
            .login(value)
            .pipe(finalize(() => loading.dismiss()))
            .subscribe(
                _ => {
                    this.navCtrl.navigateRoot([''], true, {replaceUrl: true});
                    this.socketService.initializeWebSocketConnection();
                },
                err => this.handleError(err));
    }

    async handleError(error: any) {
        let message: string;
        if (error.status && error.status === 401) {
            message = 'Logowanie nie powiodło się';
        } else {
            message = `Wystąpienie niespodziewanego błędu: ${error.statusText}`;
        }

        const toast = await this.toastCtrl.create({
            message,
            duration: 5000,
            position: 'bottom'
        });

        toast.present();
    }

}
