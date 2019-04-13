import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TabsPageRoutingModule} from './tabs.router.module';
import {TabsPage} from './tabs.page';
import {CourtsPageModule} from '../courts/courts.module';
import {WeatherPageModule} from '../weather/weather.module';
import {ProfilePageModule} from '../profile/profile.module';
import {MessagesPageModule} from '../messages/messages.module';
import {SearchFormPageModule} from '../search-form/search-form.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        SearchFormPageModule,
        MessagesPageModule,
        CourtsPageModule,
        WeatherPageModule,
        ProfilePageModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
