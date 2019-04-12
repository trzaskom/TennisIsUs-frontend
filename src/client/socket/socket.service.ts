import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Message} from '../model/Message';
import {User} from '../model/User';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    serverUrl = environment.serverURL + '/socket';
    isLoaded = false;
    stompClient;
    oldMessages: Message[] = [];
    loggedUsersDetails: User;
    chosenFriend: User;

    private newMessage = new ReplaySubject<Message>();
    public newMessageObservable = this.newMessage.asObservable();

    constructor(private readonly httpClient: HttpClient) {
    }

    initializeWebSocketConnection() {

        this.getCurrentUser().subscribe(response => {
                this.loggedUsersDetails = <User>response;

                if (this.stompClient !== undefined && this.stompClient.status === 'CONNECTED') {
                    this.disconnect();
                }

                const ws = new SockJS(this.serverUrl);
                this.stompClient = Stomp.over(ws);
                const that = this;
                this.stompClient.connect({}, function () {
                    that.isLoaded = true;
                    that.openSocket();
                });
            }
        );


    }

    openSocket() {
        if (this.isLoaded) {
            this.getOldMessages().subscribe(oldMessages => {
                this.oldMessages = <Message[]>oldMessages;
                this.stompClient.subscribe('/socket-publisher/' + this.loggedUsersDetails.id, (message) => {
                    this.handleResult(message);
                });
            });

        }
    }

    handleResult(message) {
        if (message.body) {
            const messageResult: Message = JSON.parse(message.body);
            this.newMessage.next(messageResult);
        }
    }

    disconnect() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
    }

    getCurrentUser() {
        return this.httpClient.get(`${environment.serverURL}/currentUser`);
    }

    getOldMessages() {
        return this.httpClient.get(`${environment.serverURL}/messages`);
    }

}
