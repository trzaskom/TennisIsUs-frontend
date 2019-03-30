import { Injectable } from '@angular/core';
// @ts-ignore
import {UserSearchDTO} from '../../client/model/UserSearchDTO';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  friends: UserSearchDTO[] = [];

  constructor() {}

  addToFriends(user: UserSearchDTO) {
    this.friends.unshift(user);
  }
}
