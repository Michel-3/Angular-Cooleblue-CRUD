import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.user = this.userService.getUserById(userId);
    });
  }

  public ngOnDestroy() {
    this.userService.unsubscribe();
  }
}