import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AuthService } from '../../core/services/auth/auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, ButtonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone:true,
})
export class Login {
  @Output() success = new EventEmitter<void>();

  email = '';
  password = '';

  constructor(private authService: AuthService) { }
  
  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login success', response);
          this.authService.user.next(response.user);
          this.authService.token.next(response.access_token);
          this.success.emit();
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
  }
}
