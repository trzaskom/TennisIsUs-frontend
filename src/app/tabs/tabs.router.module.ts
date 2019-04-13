import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {CourtsPage} from '../courts/courts.page';
import {MessagesPage} from '../messages/messages.page';
import {WeatherPage} from '../weather/weather.page';
import {ProfilePage} from '../profile/profile.page';
import {SearchFormPage} from '../search-form/search-form.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/(search-form:search-form)',
                pathMatch: 'full',
            },
            {
                path: 'search-form',
                outlet: 'search-form',
                component: SearchFormPage
            },
            {
                path: 'messages',
                outlet: 'messages',
                component: MessagesPage
            },
            {
                path: 'courts',
                outlet: 'courts',
                component: CourtsPage
            },
            {
                path: 'weather',
                outlet: 'weather',
                component: WeatherPage
            },
            {
                path: 'profile',
                outlet: 'profile',
                component: ProfilePage
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/(search-form:search-form)',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
