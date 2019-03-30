import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {HomePageModule} from '../home/home.module';
import {CourtsPageModule} from '../courts/courts.module';
import {WeatherPageModule} from '../weather/weather.module';
import {ProfilePageModule} from '../profile/profile.module';
import {MessagesPageModule} from '../messages/messages.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        HomePageModule,
        MessagesPageModule,
        CourtsPageModule,
        WeatherPageModule,
        ProfilePageModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
