import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  @Output() onCancel = new EventEmitter<void>();
  public modus!: 'add' | 'edit';

  constructor(private userService: UserService) {}

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
