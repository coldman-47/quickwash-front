import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';


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

  constructor(private authService:AuthService) {}

  register() {
    const payload = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
    };

    this.authService.register(payload).subscribe({
      next: (res) => console.log('Register OK', res),
      error: (err) => {
        console.error('Register failed', err.status, err.error);
      }
    });
  }
}
