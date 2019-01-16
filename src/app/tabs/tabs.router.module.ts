import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';
import {HomePage} from '../home/home.page';
import {CourtsPage} from '../courts/courts.page';
import {MatchesPage} from '../matches/matches.page';
import {WeatherPage} from '../weather/weather.page';
import {ProfilePage} from '../profile/profile.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/(home:home)',
                pathMatch: 'full',
            },
            {
                path: 'home',
                outlet: 'home',
                component: HomePage
            },
            {
                path: 'matches',
                outlet: 'matches',
                component: MatchesPage
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
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
