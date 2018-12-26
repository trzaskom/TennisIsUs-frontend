import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {ContactPageModule} from '../contact/contact.module';
import {AboutPageModule} from '../about/about.module';
import {HomePageModule} from '../home/home.module';
import {CourtsPageModule} from '../courts/courts.module';
import {MatchesPageModule} from '../matches/matches.module';
import {WeatherPageModule} from '../weather/weather.module';
import {ProfilePageModule} from '../profile/profile.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        HomePageModule,
        MatchesPageModule,
        CourtsPageModule,
        WeatherPageModule,
        ProfilePageModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
