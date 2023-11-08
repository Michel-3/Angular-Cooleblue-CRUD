import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public userDataKey = 'users';
  public users: User[] = [];
  private deleteSubject: Subject<{result: boolean}> = new Subject();
  public deleteResult$ = this.deleteSubject.asObservable();
  private test: BehaviorSubject<any> = new BehaviorSubject('Michel');
  public test$ = this.test.asObservable();
  private editSubject: Subject<{result: boolean}> = new Subject();
  public editResult$ = this.editSubject.asObservable();
  private addSubject: Subject<{result: boolean}> = new Subject();
  public addResult$ = this.addSubject.asObservable();
  private unsubscriber$ = new Subject<void>();

  constructor() { 
    this.users = [];
    this.getUsers();
  }

  public getUsers() {
    const data = localStorage.getItem(this.userDataKey);
    if (data) {
      const userData = JSON.parse(data);
      this.users = userData.map((user: any) => new User(user));
    }
  }

  public getUserById(userId: string): User | null {    
    const userIndex: number = this.users.map((user: User) => user.id).indexOf(userId);
    
    if (userIndex > -1) {
      return this.users[userIndex];
    }
    return null;
}

  public deleteUser(id: string): void {
    this.users = this.users.filter((user: User) => user.id != id);
    localStorage.setItem(this.userDataKey, JSON.stringify(this.users));
    setTimeout(() => {
      this.deleteSubject.next({result: true});
    });
  }

  public addUser(user: User) {
    this.users.push(user);
    localStorage.setItem(this.userDataKey, JSON.stringify(this.users));
    this.addSubject.next({result: true});
  }

  public generateUniqueUserId(): string {
    return new Date().getTime().toString();
  }

  public updateUser(user: User) {
    const userIndex: number = this.users.findIndex((u: User) => u.id === user.id);

    if (userIndex !== -1) {
      this.users[userIndex] = user;
      localStorage.setItem(this.userDataKey, JSON.stringify(this.users));
      this.editSubject.next({result: true});
    }
  }

  public unsubscribe() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
