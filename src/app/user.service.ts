import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public userDataKey = 'users';
  public users: User[];

  constructor() { 
    const userData = localStorage.getItem(this.userDataKey);
    this.users = userData ? JSON.parse(userData) : [];
  }

  getUserById(userId: number): any {
    const userData = localStorage.getItem(this.userDataKey);
    
    if (userData === null) {
      console.error('User data in localStorage is null.');
      return null;
    }
  
    const users = JSON.parse(userData);
    const userIndex: number = users.map((u: any) => u.id).indexOf(userId);
    
    if (userIndex === -1) {
      return null;
    }
  
    return users[userIndex];
}

  generateUniqueUserId(): number {
    if (this.userDataKey.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.users.map(user => user.id));
    return maxId + 1;
  }
  
  getUserProperties(): { name: string; type: string;}[] {
    return [
      { name: 'Name', type: 'string' },
      { name: 'Infix', type: 'string' },
      { name: 'Lastname', type: 'string' },
      { name: 'Street', type: 'string' },
      { name: 'Housenumber', type: 'number' },
      { name: 'Additive', type: 'string' },
      { name: 'Postalcode', type: 'string' },
      { name: 'City', type: 'string' },
    ];
  }
}
