import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../model/User';
import {ReplaySubject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {

    private newFriend = new ReplaySubject<any>();
    public newFriendObservable = this.newFriend.asObservable();
    friends: User[];

    constructor(private readonly http: HttpClient) {
    }

    addToFriends(friendId: number) {
        return (this.http.post(`${environment.serverURL}/friends`, friendId)).subscribe(_ => {
            this.getUserFriends().subscribe(_ => {
                this.newFriend.next();
            });
        });
    }

    getUserFriends() {
        return this.http.get(`${environment.serverURL}/friends`).pipe(tap(response => {
            this.friends = <User[]>response;
        }));
    }

}
