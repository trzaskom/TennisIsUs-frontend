import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GoogleMaps} from '@ionic-native/google-maps';
import {environment} from '../environments/environment';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('jwt_token');
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: environment.whitelistedDomains
            }
        }),
        IonicModule.forRoot(), AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        GoogleMaps,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
