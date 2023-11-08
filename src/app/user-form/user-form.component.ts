import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  @Output() onCancel = new EventEmitter<void>();
  public modus!: 'add' | 'edit';
  private unsubscriber$ = new Subject<void>();

  constructor(private userService: UserService) {
    this.userService.editResult$.subscribe((response) => {
      if (response.result) {
        console.log('User Edited');
      }
    });
  }

  public ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public ngOnInit(): void {
    this.modus = Boolean(this.user) ? 'edit' : 'add';

    if (this.modus === 'add') {
      this.user = new User({
        id: this.userService.generateUniqueUserId(), 
        name: '',
        infix: '',
        lastname: '',
        street: '',
        housenumber: '',
        additive: '',
        postalcode: '',
        city: '',
      });
    } 

    this.userService.editResult$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((response) => {
        if (response.result) {
          console.log('User Edited, Unsubscribed');
        }
      });

      this.userService.getUsers();

      this.userService.deleteResult$
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe((x: any) => {
          console.log(x);
          this.userService.getUsers();
        });
  }



  public submitForm(): void {
    if (this.user) {
      if (
        this.user.name &&
        this.user.lastname &&
        this.user.street &&
        this.user.housenumber &&
        this.user.postalcode &&
        this.user.city
      ) {
        this.modus === 'add' ? this.userService.addUser(this.user) : this.userService.updateUser(this.user);
      } else {
        alert('Please, fill in all the fields with a *');
      }
    }
  }
}
