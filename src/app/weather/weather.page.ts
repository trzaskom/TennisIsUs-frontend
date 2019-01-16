import {Component, OnInit} from '@angular/core';
/*import {RestService} from '../../client/api/rest.service';
import {User} from '../../client/model/User';*/

@Component({
    selector: 'app-weather',
    templateUrl: './weather.page.html',
    styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

    /*newUser: any;
    user: any = {
        name: 'Tomasz',
        surname: 'Tomaszewski',
        email: 'tom@tom.wp.pl',
        gender: 'male',
        age: 23
    };

    constructor(public restService: RestService) {
        console.log(this.user);
        restService.createTestUser(this.user).subscribe(newUser => {
            this.newUser = newUser;
        });
        console.log(this.newUser);
    }*/

    ngOnInit() {
    }

}
