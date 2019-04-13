import {Component, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../client/model/Message';
import {User} from '../../client/model/User';
import {AuthService} from '../auth/auth.service';
import {Content} from '@ionic/angular';
import {SocketService} from '../../client/socket/socket.service';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.page.html',
    styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
    @ViewChild('IonContent') content: Content;

    chatMessage = '';
    messages: Message[] = [];
    loggedUsersDetails: User;
    privateChatFriend: User;

    constructor(private readonly authService: AuthService, private readonly socketService: SocketService) {

        this.loggedUsersDetails = this.socketService.loggedUsersDetails;
        this.privateChatFriend = this.socketService.chosenFriend;

        this.messages = this.socketService.oldMessages.filter(message => {
            return (Number(message.fromId) === this.privateChatFriend.id || Number(message.toId) === this.privateChatFriend.id);
        });
        this.scrollDown();

        this.socketService.newMessageObservable.subscribe(newMessage => {
            if (Number(newMessage.fromId) === this.privateChatFriend.id || Number(newMessage.toId) === this.privateChatFriend.id) {
                this.messages.push(newMessage);
                this.scrollDown();
            }
        });
    }

    ngOnInit() {
    }


    sendMessageUsingSocket() {
        const d = new Date();
        const message: Message = {
            message: this.chatMessage, fromId: String(this.loggedUsersDetails.id),
            toId: String(this.privateChatFriend.id),
            time: (String(d.getHours()) + ':' + String(d.getMinutes()))
        };
        this.socketService.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(message));
        this.chatMessage = '';
    }

    scrollDown() {
        setTimeout(() => {
            this.content.scrollToBottom(50);
        }, 50);
    }
}
