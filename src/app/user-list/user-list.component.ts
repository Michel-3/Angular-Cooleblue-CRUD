import { Component, OnInit, ViewChild } from '@angular/core';
import { faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  faUserPlus = faUserPlus;
  faInfoCircle = faInfoCircle;
  isFormVisible: boolean = false;
  users: any[];
  selectedUser: any;

  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  constructor(private userService: UserService, private router: Router) {
    this.users = this.userService.getUserProperties();
  }

  viewUserDetail(userId: number) {
    this.router.navigate(['/user-detail', userId]);
  }

  ngOnInit() {
    this.loadUserDataFromLocalStorage();
  }

  loadUserDataFromLocalStorage() {
    const storedUsers = localStorage.getItem(this.userService.userDataKey);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [];
    }
  }

  onOpenAddForm() {
    this.isFormVisible = !this.isFormVisible;
    this.userFormComponent.mode = 'add';
  }

  onUserAdded(user: any) {
  if (this.userFormComponent.mode === 'add') {
    this.users.push(user);
  } else if (this.userFormComponent.mode === 'edit') {
      this.editUserData(user);
    }
    this.isFormVisible = false;
    this.userFormComponent.mode = 'add';
  }

  onOpenEditForm(user: any) {
    this.selectedUser = user;
    this.isFormVisible = true;
    this.userFormComponent.mode = 'edit';
    this.userFormComponent.populateEditForm(user);
  }
  
  onDeleteUser(index: any) {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    users.splice(index, 1);

    localStorage.setItem('users', JSON.stringify(users));

    window.location.reload();
  }

  editUserData(user: any) {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
    }
  }

}
