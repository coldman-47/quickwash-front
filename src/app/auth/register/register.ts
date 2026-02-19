import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [InputTextModule, ButtonModule, InputGroupModule, InputGroupAddonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  register() {
    const payload = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
    };

    console.log(payload);
  }
}
