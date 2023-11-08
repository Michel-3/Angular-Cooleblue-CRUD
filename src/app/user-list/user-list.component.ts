import { Component, OnDestroy } from '@angular/core';
import { faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy {
  public faUserPlus = faUserPlus;
  public faInfoCircle = faInfoCircle;
  public isFormVisible: boolean = false;
  public users: User[];
  public selectedUser?: User;
  private unsubscriber$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router) {
    this.users = this.userService.users;
    this.userService.deleteResult$
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe((response: {result: boolean }) => {
      if (response.result) {
        this.users = this.userService.users;
      }
    });

    this.userService.addResult$
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe((response: {result: boolean }) => {
      if (response.result) {
        this.users = this.userService.users;
        this.isFormVisible = false;
      }
    });

    this.userService.editResult$
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe((response: {result: boolean }) => {
      if (response.result) {
        this.users = this.userService.users;
        this.isFormVisible = false;
      }
    });
  }

  public viewUserDetail(userId: string): void {
    this.router.navigate(['/user-detail', userId]);
  }

  public openUserForm(userId?: string): void {
    this.isFormVisible = !this.isFormVisible;

    if (userId) {
      const filteredResult = this.users.filter((user: User) => user.id == userId);
      if (filteredResult.length == 1) {
        this.selectedUser = filteredResult[0];
      }
    } else {
      this.selectedUser = undefined;
    }
  }

  public deleteUser(id: string): void {
    this.userService.deleteUser(id);
  }

  public ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();  }
}
