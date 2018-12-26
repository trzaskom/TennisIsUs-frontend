import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    private users: Array<any>;

    constructor(public restService: RestService) {
    }

    ngOnInit() {
        this.restService.getUsers().subscribe(users => {
            this.users = users;
        });
    }

}
