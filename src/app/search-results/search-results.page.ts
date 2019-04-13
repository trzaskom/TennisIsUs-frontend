import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {UserSearchDTO} from '../../client/model/UserSearchDTO';
import {SearchService} from '../../client/api/search/search.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.page.html',
    styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

    searchedPlayers: UserSearchDTO[];

    constructor(private readonly searchService: SearchService, private readonly navCtrl: NavController) {
        this.searchedPlayers = this.searchService.searchedPlayers;
    }

    ngOnInit() {
    }

    foundPlayerDetails(user: UserSearchDTO) {
        this.searchService.detailedPlayer = user;
        this.navCtrl.navigateRoot('search-details');
    }

}
