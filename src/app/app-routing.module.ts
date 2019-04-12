import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
    {path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard]},
    {path: 'courts', loadChildren: './courts/courts.module#CourtsPageModule', canActivate: [AuthGuard]},
    {path: 'matches', loadChildren: './matches/matches.module#MatchesPageModule', canActivate: [AuthGuard]},
    {path: 'weather', loadChildren: './weather/weather.module#WeatherPageModule', canActivate: [AuthGuard]},
    {path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuard]},
    {path: 'signup', loadChildren: './signup/signup.module#SignupPageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'rating', loadChildren: './rating/rating.module#RatingPageModule', canActivate: [AuthGuard]},
    {path: 'messages', loadChildren: './messages/messages.module#MessagesPageModule', canActivate: [AuthGuard]},
  { path: 'chat-room', loadChildren: './messages/chat-room/chat-room.module#ChatRoomPageModule', canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
