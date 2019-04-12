import {Component, OnInit} from '@angular/core';
import {User} from '../../client/model/User';
import {NavController} from '@ionic/angular';
import {FriendsService} from '../../client/api/friends/friends.service';
import {SocketService} from '../../client/socket/socket.service';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

    friends: User[];

    constructor(private readonly socketService: SocketService, private readonly navCtrl: NavController,
                private readonly friendsService: FriendsService) {
        this.friendsService.getUserFriends().subscribe(_ => {
            this.friends = this.friendsService.friends;
        });

        this.friendsService.newFriendObservable.subscribe(_ => {
            this.friends = this.friendsService.friends;
        });
    }

    ngOnInit() {
    }

    privateChat(friend) {
        this.socketService.chosenFriend = friend;
        this.navCtrl.navigateRoot('chat-room');
    }

}
