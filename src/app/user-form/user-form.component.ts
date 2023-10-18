import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() isFormVisible: boolean = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() userAdded = new EventEmitter<any>();
  userProperties: { name: string; type: string; required?: boolean }[];
  formData: any = {};

  constructor(private userService: UserService) {
    this.userProperties = this.userService.getUserProperties();

    this.userProperties.forEach(property => {
      if (
        property.name === 'Name' || 
        property.name === 'Lastname' || 
        property.name === 'City' || 
        property.name === 'Housenumber' || 
        property.name === 'Postalcode' ||
        property.name === 'Street'
        ) {
        property.required = true;
      } else {
        property.required = false;
      }
    });
  }

  onToggleCloseForm() {
    this.isFormVisible = false;
    window.location.reload();
  }

  populateEditForm(userData: any) {
    this.formData = { ...userData };
    this.mode = 'edit';
  }

  onAddFormSubmit() {
    const requiredFields = this.userProperties.filter(property => property.required);
    for (const field of requiredFields) {
      if (!this.formData[field.name]) {
        alert(`Please fill in the fields with this * icon.`);
        return;
      }
    }

    const newUser = { ...this.formData };
    newUser.id = this.userService.generateUniqueUserId();

    const storedUsers = localStorage.getItem(this.userService.userDataKey);
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(newUser);
    localStorage.setItem(this.userService.userDataKey, JSON.stringify(users));

    this.userAdded.emit(newUser);
    window.location.reload();
  }

  onEditFormSubmit() {
    const storedUsers = localStorage.getItem(this.userService.userDataKey);
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const index = users.findIndex((u: any) => u.id === this.formData.id);
    if (index !== -1) {
      users[index] = this.formData;
      localStorage.setItem(this.userService.userDataKey, JSON.stringify(users));
    }

    this.userAdded.emit(this.formData);
    this.mode = 'add';
    this.onToggleCloseForm();
  }

  onFormSubmit() {
    if (this.mode === 'add') {
      this.onAddFormSubmit();
    } else if (this.mode === 'edit') {
      this.onEditFormSubmit();
    }
  }
}
