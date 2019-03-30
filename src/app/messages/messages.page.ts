import {Component, OnInit} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Message} from '../../client/model/Message';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {User} from '../../client/model/User';
// @ts-ignore
import {UserSearchDTO} from '../../client/model/UserSearchDTO';
import {MessagesService} from './messages.service';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
    serverUrl = environment.serverURL + '/socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;
    messages: Message[] = [];
    loggedUsersDetails: User;
    friends: UserSearchDTO[];
    privateChatFlag = false;
    privateChatReceiver: UserSearchDTO;

    constructor(private readonly authService: AuthService,
                private readonly messagesService: MessagesService) {
        this.authService.getCurrentUser().subscribe(() => {
                this.loggedUsersDetails = this.authService.whoAmI();
            }
        );
        this.friends = this.messagesService.friends;
    }

    ngOnInit() {
        this.initializeWebSocketConnection();
    }

    initializeWebSocketConnection() {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, function () {
            that.isLoaded = true;
            that.openSocket();
        });
    }

    sendMessageUsingSocket(messageContent: string) {
        const message: Message = {
            message: messageContent, fromId: String(this.loggedUsersDetails.id),
            toId: String(this.privateChatReceiver.id)
        };
        this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(message));

    }

    openSocket() {
        if (this.isLoaded) {
            this.isCustomSocketOpened = true;
            this.stompClient.subscribe('/socket-publisher/' + this.loggedUsersDetails.id, (message) => {
                this.handleResult(message);
            });
        }
    }

    handleResult(message) {
        if (message.body) {
            const messageResult: Message = JSON.parse(message.body);
            console.log(messageResult);
            this.messages.push(messageResult);
        }
    }

    privateChat(friend) {
        this.privateChatReceiver = friend;
        this.privateChatFlag = true;
    }
}
