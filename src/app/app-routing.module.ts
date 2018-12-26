import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'courts', loadChildren: './courts/courts.module#CourtsPageModule' },
  { path: 'matches', loadChildren: './matches/matches.module#MatchesPageModule' },
  { path: 'weather', loadChildren: './weather/weather.module#WeatherPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
