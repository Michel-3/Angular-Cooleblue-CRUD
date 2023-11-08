import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  private unsubscriber$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  public ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe(params => {
      const userId = params['id'];
      this.user = this.userService.getUserById(userId);
    });
  }

  public ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}